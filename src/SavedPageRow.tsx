import React from 'react';
import styled from 'styled-components';

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Column = styled.div`
  flex: 1;
  padding: 8px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #D9D9D9;
  width: 100%;
  height: 43px;
  border: none;
  padding: 0 32px;
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  font-weight: bold;
`;

const SavedPageRow = ({ name, date, onDelete, onOpen }: any) => {
  return (
    <RowContainer>
      <Column >{name}</Column>
      <Column>{date}</Column>
      <Column >
        <Button onClick={() => onOpen(name)}>Open Saved Page</Button>
      </Column>
      <Column>
        <Button onClick={() => onDelete(name)}>Delete</Button>
      </Column>
    </RowContainer>
  );
};

export default SavedPageRow;
