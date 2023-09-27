import { useState } from "react";
import { Container, Label, EmailDropdown, Button } from "./styles";



interface SavedPagesProps {
  recruiterEmails: Array<string>;
  switchState: (name: string) => void;
}
const SetUser: React.FC<SavedPagesProps> = ({ switchState, recruiterEmails }: any) => {
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
