import { useEffect, useState } from 'react';
import './App.css';
import SetUser from './SetUser';
import SavedPages from './SavedPages';
import SearchByEmail from './SearchByEmail';
import { createUserPage, getCandidateIdByEmail, getCandidatePages, uploadHTMLToS3, deletePage, getCandidateIdByUrl } from './network';
import { Spinner } from './styles';
import SetContactType from './ContactType';
export interface SavedPage {
  pageName: string;
  pageUrl: string;
  id: string;
  viewUrl: string;
}
function App() {

  const [loggedInUser, setLoggedInUser] = useState('')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [candidateId, setCandidateId] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedPages, setSavedPages] = useState<Array<SavedPage>>([]);
  const recruiterEmails = ['mariam@nodogoro.com'];
  const [contactType, setContactType] = useState('')

  useEffect(() => {
    let loggedInEmail = localStorage.getItem('loggedin-user')
    if (loggedInEmail)
      setLoggedInUser(loggedInEmail)
    const candId = localStorage.getItem('candidate-id');
    const candEmail = localStorage.getItem('candidate-email');
    const conType = localStorage.getItem('contact-type');

    if (candId && candEmail && conType) {
      setCandidateEmail(candEmail);
      setCandidateId(candId);
      setContactType(conType);
      (async () => {
        await getCandidatesSavedPages(candId)
      })()
    }

  }, [])
  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
    setCandidateEmail('')
    setContactType('')
  }
  const isFileURL = (url: string) => {
    const fileExtensions = ['.pdf', '.jpg', '.jpeg'];
    const fileExtension = url!.split('.')!.pop()!.toLowerCase();
    return fileExtensions.includes(`.${fileExtension}`);
  }
  const handleLogin = (email: string) => {
    localStorage.setItem('loggedin-user', email)
    setLoggedInUser(email)
  }
  const getHtmlContent = () => {
    return new Promise((resolve, reject) => {
      if (chrome?.tabs) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length === 0) {
            reject('No active tabs found.');
            return;
          }
          chrome.tabs.executeScript(
            tabs[0].id!,
            { code: 'document.documentElement.outerHTML' },
            (response) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                const htmlContent = response ? response[0] : '';
                const currentUrl = tabs[0].url;
                resolve({ html: htmlContent, url: currentUrl });
              }
            }
          );
        });
      } else {
        reject('chrome.tabs API not available.');
      }
    });
  };
  const getCandidatesSavedPages = async (id: string) => {
    setLoading(true)
    const newPages = await getCandidatePages(id);
    setSavedPages(newPages)
    setLoading(false)

  }
  const handleSearchByEmailOrUrl = async (email: string) => {
    try {
      setLoading(true);
      let id;
      if (contactType === 'email')
        id = await getCandidateIdByEmail(email, loggedInUser)
      else
        id = await getCandidateIdByUrl(email, loggedInUser)
      if (id) {
        await getCandidatesSavedPages(id)
        setCandidateEmail(email)
        setCandidateId(id)
        localStorage.setItem('candidate-id', id)
        localStorage.setItem('candidate-email', email)
      }
      else {
        alert('user does not exist')
      }
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  };
  const savePage = async () => {
    try {
      setLoading(true);

      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        if (!chrome.runtime.lastError && tabs.length > 0) {
          const currentTab = tabs[0];
          const fileUrl = currentTab.url;
          const timestamp = new Date().getTime();
          if (isFileURL(fileUrl!)) {
            console.log(fileUrl)
            const fileExtension = fileUrl?.split('.').pop();
            const name = `${fileExtension}-${timestamp}`
            fetch(fileUrl!)
              .then((response) => response.blob())
              .then(async (blob) => {
                const resp = await createUserPage(candidateId, candidateEmail, name, fileUrl!, fileExtension!)
                const { preSignedUrl } = resp
                const reader = new FileReader();
                reader.onload = async () => {
                  const arrayBuffer = reader.result;
                  await uploadHTMLToS3(arrayBuffer, preSignedUrl)
                  await getCandidatesSavedPages(candidateId)
                };
                reader.readAsArrayBuffer(blob);
              })
              .catch((error) => {
                console.error('Fetch Error:', error);
                // Handle the fetch error if needed
              });
          }
          else {
            const pageData = await getHtmlContent() as { html: string; url: string };
            const { html, url } = pageData
            const urlClass = new URL(url)
            const name = `${urlClass.hostname}-${timestamp}`
            const resp = await createUserPage(candidateId, loggedInUser, name, url, 'html')
            const { preSignedUrl } = resp
            await uploadHTMLToS3(html, preSignedUrl)
            await getCandidatesSavedPages(candidateId)
          }

        }
      });

      setLoading(false);

    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const handleDeletePage = async (pageId: string) => {
    try {
      setLoading(true)
      await deletePage(candidateId, pageId)
      await getCandidatesSavedPages(candidateId)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const resetCandidate = () => {
    setCandidateEmail('')
    setContactType('')
    setCandidateId('')
    localStorage.removeItem('candidate-id')
    localStorage.removeItem('candidate-email')
    localStorage.removeItem('contact-type')


  }
  const renderView = () => {
    if (!loggedInUser)
      return <SetUser recruiterEmails={recruiterEmails} switchState={(val: string) => handleLogin(val)} />;
    else
      if (!contactType)
        return <SetContactType setType={(val: string) => {
          setContactType(val);
          localStorage.setItem('contact-type', val)
        }} />
      else
        if (!candidateEmail)
          return <SearchByEmail
            logout={() => logout()}
            loggedInUser={loggedInUser}
            switchState={(email: string) => setCandidateEmail(email)}
            handleSearchByEmailOrUrl={(email: string) => handleSearchByEmailOrUrl(email)}
          />;
        else
          return <SavedPages
            deletePage={(id: string) => handleDeletePage(id)}
            savePage={() => savePage()}
            changeCandidate={() => resetCandidate()}
            candidateEmail={candidateEmail}
            savedPages={savedPages}
          />
  };
  return (
    <>
      <Spinner isLoading={loading} />
      {renderView()}
    </>
  );
}

export default App;
