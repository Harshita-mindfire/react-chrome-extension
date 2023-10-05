import React, { useState } from 'react';

import { Button, Label, Container, EmailInput, Header, UserInfo, ActionButton } from './styles';

const SearchByEmail = ({  loggedInUser, logout, handleSearchByEmailOrUrl }: any) => {
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

        <Label>Select Candidate by email/url:</Label>
        <EmailInput
          placeholder="Enter email/url"
          value={email}
          onChange={handleEmailChange}
        />
        <Button onClick={() => handleSearchByEmailOrUrl(email)}>Confirm</Button>
      </Container>
    </>
  );
};

export default SearchByEmail;
