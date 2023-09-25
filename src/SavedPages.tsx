import React, { useState } from 'react';
import styled from 'styled-components';
import SavedPageRow from './SavedPageRow';

const View3Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SavedPagesList = styled.div`
  width: 100%;
`;

const SaveCurrentPageButton = styled.button`
  min-width: 30%;
  width: auto;
  height: 43px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0 32px;
  font-size: 16px;
  background-color: #44969C;
  cursor: pointer;
  margin-top: 16px;
`;

const SavedPages = () => {
  const [savedPages, setSavedPages] = useState([
    { name: 'Page 1', date: '2023-09-25' },
    { name: 'Page 2', date: '2023-09-24' },
    { name: 'Page 2', date: '2023-09-24' },
    { name: 'Page 2', date: '2023-09-24' },
    { name: 'Page 2', date: '2023-09-24' },
    { name: 'Page 2', date: '2023-09-24' },

    // Add more saved pages as needed
  ]);

  const handleDelete = (nameToDelete: any) => {
    const updatedPages = savedPages.filter((page) => page.name !== nameToDelete);
    setSavedPages(updatedPages);
  };

  const handleOpen = (nameToOpen: any) => {
    // Implement logic to open the saved page with the given name
    console.log('Opening saved page:', nameToOpen);
  };

  const handleSaveCurrentPage = () => {
    // Implement logic to save the current page
    console.log('Saving current page...');
  };

  return (
    <View3Container>
      <h1>Saved Pages</h1>
      <SavedPagesList>
        {savedPages.map((page, index) => (
          <SavedPageRow
            key={index}
            name={page.name}
            date={page.date}
            onDelete={handleDelete}
            onOpen={handleOpen}
          />
        ))}
      </SavedPagesList>
      <SaveCurrentPageButton onClick={handleSaveCurrentPage}>
        Save Current Page
      </SaveCurrentPageButton>
    </View3Container>
  );
};

export default SavedPages;
