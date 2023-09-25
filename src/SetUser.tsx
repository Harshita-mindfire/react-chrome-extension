import React from 'react';
import styled from 'styled-components';

const View1Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SelectLabel = styled.label`
  font-size: 18px;
  margin-bottom: 16px;
`;

const EmailDropdown = styled.select`
  height: 43px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0 32px;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ConfirmButton = styled.button`
  width: auto;
  height: 43px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0;
  margin: 0;
  font-size: 16px;
  cursor: pointer;
  background-color: #44969C;
  min-width: 30%
`;

const SetUser = ({ switchState }: any) => {
  const recruiterEmails = [
    'recruiter1@example.com',
    'recruiter2@example.com',
    'recruiter3@example.com',
    // Add more email options as needed
  ];

  return (
    <View1Container>
      <SelectLabel>Select the Recruiter using this Chrome Extension</SelectLabel>
      <EmailDropdown>
        {recruiterEmails.map((email, index) => (
          <option key={index} value={email}>
            {email}
          </option>
        ))}
      </EmailDropdown>
      <ConfirmButton onClick={switchState}>Confirm</ConfirmButton>
    </View1Container>
  );
};

export default SetUser;
