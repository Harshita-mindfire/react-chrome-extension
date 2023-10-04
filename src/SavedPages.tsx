import { useState } from 'react';
import SavedPageRow from './SavedPageRow';
import { Button, SavedPagesList, Container, Label, Header, ActionButton } from './styles'
import { SavedPagesProps } from './interfaces';


const SavedPages: React.FC<SavedPagesProps> = ({ savedPages, deletePage, candidateEmail, changeCandidate, savePage, edit }) => {

  const handleOpen = (nameToOpen: any) => {
    // Implement logic to open the saved page with the given name
    console.log('Opening saved page:', nameToOpen);
  };



  return (
    <Container style={{ height: '100%', padding: '20px' }}>
      <Header style={{ justifyContent: 'center' }}>
        <Label>{`Adding pages for ${candidateEmail}`}</Label>
        <ActionButton onClick={() => changeCandidate()} style={{ width: 'auto', marginBottom: '16px' }}>
          Change Candidate
        </ActionButton>
        <ActionButton onClick={() => edit()} style={{ width: 'auto', marginBottom: '16px', marginLeft: "10px" }}>
          Edit Candidate
        </ActionButton>
      </Header>
      <Label>Saved Pages</Label>
      <SavedPagesList>
        {savedPages.map((page, index) => (
          <SavedPageRow
            key={index}
            name={page.pageName}
            url={page.pageUrl}
            htmlUrl={page.viewUrl}
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
