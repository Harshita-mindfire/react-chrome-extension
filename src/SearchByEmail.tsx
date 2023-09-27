import React, { useState } from 'react';

import { Button, Label, Container, EmailInput, Header, UserInfo, ActionButton } from './styles';

const SearchByEmail = ({  loggedInUser, logout, handleSearchByEmail }: any) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <Header>
        <UserInfo>
          {loggedInUser}
        </UserInfo>
        <ActionButton onClick={logout} style={{ width: 'auto' }}>
          logout
        </ActionButton>
      </Header>

      <Container>

        <Label>Select Candidate by email:</Label>
        <EmailInput
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <Button onClick={() => handleSearchByEmail(email)}>Confirm</Button>
      </Container>
    </>
  );
};

export default SearchByEmail;
