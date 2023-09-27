import { useState } from 'react';
import SavedPageRow from './SavedPageRow';
import { Button, SavedPagesList, Container, Label, Header, ActionButton } from './styles'

interface SavedPagesProps {
  savedPages: Array<{ pageName: string; pageUrl: string,id:string }>;
  savePage: () => void;
  candidateEmail: string;
  changeCandidate: () => void;
  deletePage:(id:string)=>void
}
const SavedPages: React.FC<SavedPagesProps> = ({ savedPages, deletePage, candidateEmail, changeCandidate,savePage }) => {

  const handleOpen = (nameToOpen: any) => {
    // Implement logic to open the saved page with the given name
    console.log('Opening saved page:', nameToOpen);
  };



  return (
    <Container style={{ height: '100%', padding: '20px' }}>
      <Header style={{ justifyContent: 'center' }}>
        <Label>{`Adding pages for ${candidateEmail}`}</Label>
        <ActionButton onClick={() => changeCandidate()} style={{ width: 'auto',marginBottom:'16px' }}>
          change user
        </ActionButton>
      </Header>
      <Label>Saved Pages</Label>
      <SavedPagesList>
        {savedPages.map((page, index) => (
          <SavedPageRow
            key={index}
            name={page.pageName}
            url={page.pageUrl}
            onDelete={() => deletePage(page.id)}
            onOpen={handleOpen}
          />
        ))}
      </SavedPagesList>
      <Button onClick={savePage}>
        Save Current Page
      </Button>
    </Container>
  );
};

export default SavedPages;
