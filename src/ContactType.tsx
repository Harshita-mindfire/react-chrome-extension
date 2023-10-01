import { Button, Label, Container } from './styles';

const SetContactType = ({ setType }: any) => {
  return (
    <>

      <Container>
        <Label>Select Contact Type:</Label>
        <Button style={{ marginBottom: '20px' }} onClick={() => setType('email')}>Email</Button>
        <Button onClick={() => setType('linkedIn')}>Linkedin</Button>
      </Container>
    </>
  );
};

export default SetContactType;
