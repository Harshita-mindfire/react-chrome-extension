import { useEffect, useState } from 'react';
import './App.css';
import SetUser from './SetUser';
import SavedPages from './SavedPages';
import SearchByEmail from './SearchByEmail';
import { getCandidateIdByEmail, getCandidatePages, deletePage, getCandidateIdByUrl, getCandidateById } from './network';
import { Spinner } from './styles';
import SetContactType from './ContactType';
import { savePageService } from './service';
import UpdateCandidate from './UpdateCandidate';
import { Candidate, SavedPage } from './interfaces';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [candidateId, setCandidateId] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedPages, setSavedPages] = useState<Array<SavedPage>>([]);
  const [candidate, setCandidate] = useState<Candidate>();

  const [editCandidate, setEditCandidate] = useState(false);

  const recruiterEmails = ['mariam@nodogoro.com'];
  const [contactType, setContactType] = useState('')



  const getCandidate = async (id: string) => {
    setLoading(true)
    const candidate = await getCandidateById(id);
    setCandidate(candidate)
    const newPages = candidate.pages
    setSavedPages(newPages)
    setLoading(false)
  }
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
        await getCandidate(candId)
      })()
    }

  }, [])

  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
    setCandidateEmail('')
    setContactType('')
  }

  const handleLogin = (email: string) => {
    localStorage.setItem('loggedin-user', email)
    setLoggedInUser(email)
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
        await getCandidate(id)
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
      savePageService(candidateId, candidateEmail, loggedInUser, getCandidate)
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
      await getCandidate(candidateId)
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
        else {
          if (editCandidate)
            return candidate && <UpdateCandidate
              id={candidateId}
              getCandidte={() => getCandidate(candidateId)}
              candidate={candidate}
              cancel={() => setEditCandidate(false)}
            />
          else
            return <SavedPages
              deletePage={(id: string) => handleDeletePage(id)}
              savePage={() => savePage()}
              changeCandidate={() => resetCandidate()}
              candidateEmail={candidateEmail}
              savedPages={savedPages}
              edit={() => setEditCandidate(true)}
            />
        }
  };
  return (
    <>
      <Spinner isLoading={loading} />
      {renderView()}
    </>
  );
}

export default App;
