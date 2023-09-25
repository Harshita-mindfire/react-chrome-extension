import React, { useState } from 'react';
import styled from 'styled-components';

const View2Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Label = styled.label`
  height: 30px;
  font-size: 18px;
  margin-bottom: 10px;
`;

const EmailInput = styled.input`
  height: 50px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0 32px;
  font-size: 16px;
  margin-bottom: 16px;
`;

const ConfirmButton = styled.button`
  width: auto;
  height: 43px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0 32px;
  font-size: 16px;
  background-color: #44969C;
  cursor: pointer;
  min-width: 30%;
`;

const SearchByEmail = ({ switchState }: any) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleConfirmClick = () => {
    // Handle the confirm button click, e.g., send the email address
    console.log('Email address:', email);
  };

  return (
    <View2Container>
      <Label>Select Candidate by email:</Label>
      <EmailInput
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
      />
      <ConfirmButton onClick={switchState}>Confirm</ConfirmButton>
    </View2Container>
  );
};

export default SearchByEmail;
