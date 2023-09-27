import { useEffect, useState } from 'react';
import './App.css';
import SetUser from './SetUser';
import SavedPages from './SavedPages';
import SearchByEmail from './SearchByEmail';
import { createUserPage, getCandidateId, getCandidatePages, uploadHTMLToS3, deletePage } from './network';
import { Spinner } from './styles';

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
  useEffect(() => {
    chrome.downloads.onChanged.addListener((downloadDelta) => {
      if (downloadDelta.state && downloadDelta.state.current === 'complete') {
        // The PDF download is complete, you can now upload it to S3.
        console.log(downloadDelta, '!!!!!')
      }
    });
    let loggedInEmail = localStorage.getItem('loggedin-user')
    if (loggedInEmail)
      setLoggedInUser(loggedInEmail)
    const candId = localStorage.getItem('candidate-id');
    const candEmail = localStorage.getItem('candidate-email');
    const candPages = localStorage.getItem('candidate-pages');
    if (candId && candEmail && candPages) {
      setCandidateEmail(candEmail);
      setCandidateId(candId);
      setSavedPages(JSON.parse(candPages))
    }

  }, [])
  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
    setCandidateEmail('')
  }

  const handleLogin = (email: string) => {
    // console.log('saving')
    // chrome.downloads.download({
    //   url: 'https://drive.google.com/file/d/1uXAoZzuG-xjrtmdxdkfrpYxThaf81i3m/view?usp=sharing',
    //   filename: 'downloads/downloaded.pdf',
    //   saveAs: false
    // });
    // https://drive.google.com/file/d/1uXAoZzuG-xjrtmdxdkfrpYxThaf81i3m/view?usp=sharing
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

  const handleSearchByEmail = async (email: string) => {
    try {
      setLoading(true);
      const id = await getCandidateId(email)
      if (id) {
        const newPages = await getCandidatePages(id);
        setSavedPages(newPages)
        setCandidateEmail(email)
        setCandidateId(id)
        localStorage.setItem('candidate-id', id)
        localStorage.setItem('candidate-email', email)
        localStorage.setItem('candidate-pages', JSON.stringify(newPages))
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
      const pageData = await getHtmlContent() as { html: string; url: string };
      const { html, url } = pageData
      const urlClass = new URL(url)
      const timestamp = new Date().getTime();
      const name = `${urlClass.hostname}-${timestamp}`
      const resp = await createUserPage(candidateId, loggedInUser, name, url)
      const { preSignedUrl } = resp
      await uploadHTMLToS3(html, preSignedUrl)
      const newPages = await getCandidatePages(candidateId);
      setSavedPages(newPages)
      localStorage.setItem('candidate-pages', JSON.stringify(newPages))

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
      const newPages = await getCandidatePages(candidateId);
      setSavedPages(newPages)
      localStorage.setItem('candidate-pages', JSON.stringify(newPages))
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const renderView = () => {
    if (!loggedInUser)
      return <SetUser recruiterEmails={recruiterEmails} switchState={(val: string) => handleLogin(val)} />;
    else
      if (!candidateEmail)
        return <SearchByEmail
          logout={() => logout()}
          loggedInUser={loggedInUser}
          switchState={(email: string) => setCandidateEmail(email)}
          handleSearchByEmail={(email: string) => handleSearchByEmail(email)}
        />;
      else
        return <SavedPages
          deletePage={(id: string) => handleDeletePage(id)}
          savePage={() => savePage()}
          changeCandidate={() => setCandidateEmail('')}
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
