import { useState } from "react";
import { Container, Label, EmailDropdown, Button } from "./styles";
import { SavedPagesComponentProps } from "./interfaces";




const SetUser: React.FC<SavedPagesComponentProps> = ({ switchState, recruiterEmails }: any) => {
  const [userEmail, setUserEmail] = useState(recruiterEmails[0])


  return (
    <Container>
      <Label>Select the Recruiter using this Chrome Extension</Label>
      <EmailDropdown defaultValue={recruiterEmails[0]} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setUserEmail(event.target.value)}>
        {recruiterEmails.map((email: string, index: number) => (
          <option key={index} value={email}>
            {email}
          </option>
        ))}
      </EmailDropdown>
      <Button onClick={() => switchState(userEmail)}>Confirm</Button>
    </Container>
  );
};

export default SetUser;
