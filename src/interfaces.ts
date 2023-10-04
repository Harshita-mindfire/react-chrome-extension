export interface SavedPage {
  pageName: string;
  pageUrl: string;
  id: string;
  viewUrl: string;
}

export interface SavedPagesProps {
  savedPages: Array<SavedPage>;
  savePage: () => void;
  candidateEmail: string;
  changeCandidate: () => void;
  deletePage: (id: string) => void;
  edit: () => void;

}

export interface SavedPagesComponentProps {
  recruiterEmails: Array<string>;
  switchState: (name: string) => void;
}

export interface EditPageProps {
  candidate: Candidate
  getCandidte: () => void
  cancel: () => void
  id: string
}

export interface Candidate {
  email?: string;
  phoneNumber?: string;
  linkedInUrl?: string;
  personalWebsite?: string;
  resumeUrl?: string;
  currentEmployer?: string;
}