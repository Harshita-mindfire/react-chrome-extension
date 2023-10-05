import { useState } from "react";
import { Button, Container, EditPageRow, EmailInput, Label } from "./styles"
import { EditPageProps } from "./interfaces";
import { editCandidate } from "./network";

const UpdateCandidate: React.FC<EditPageProps> = ({ candidate, getCandidte, id, cancel }) => {
  const [email, setEmail] = useState(candidate.email)
  const [phoneNumber, setPhoneNumber] = useState(candidate.phoneNumber)
  const [linkedInUrl, setLinkedInUrl] = useState(candidate.linkedInUrl)
  const [personalWebsite, setPersonalWebsite] = useState(candidate.personalWebsite)
  const [resumeUrl, setResumeUrl] = useState(candidate.resumeUrl)
  const [currentEmployer, setCurrentEmployer] = useState(candidate.currentEmployer)


  const handleEdit = async () => {
    await editCandidate(id, { email, phoneNumber, linkedInUrl, personalWebsite, resumeUrl, currentEmployer })
    getCandidte()
    cancel()
  }
  return (
    <Container style={{ padding: "25px" }}>
      <EditPageRow>
        <div style={{ flex: 1 }}>
          <Label > Email: </Label>
        </div>
        <div style={{ flex: 3 }}>
          <EmailInput
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
      </EditPageRow>
      <EditPageRow>
        <div style={{ flex: 1 }}>
          <Label > phone number: </Label>
        </div>
        <div style={{ flex: 3 }}>
          <EmailInput
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
          />
        </div>
      </EditPageRow>
      <EditPageRow>
        <div style={{ flex: 1 }}>
          <Label > Linkedin URL: </Label>
        </div>
        <div style={{ flex: 3 }}>
          <EmailInput
            value={linkedInUrl}
            onChange={(e: any) => setLinkedInUrl(e.target.value)}
          />
        </div>
      </EditPageRow>
      <EditPageRow>
        <div style={{ flex: 1 }}>
          <Label > Resume URL: </Label>
        </div>
        <div style={{ flex: 3 }}>
          <EmailInput
            value={resumeUrl}
            onChange={(e: any) => setResumeUrl(e.target.value)}
          />
        </div>
      </EditPageRow>
      <EditPageRow>
        <div style={{ flex: 1 }}>
          <Label > Personal website URL: </Label>
        </div>
        <div style={{ flex: 3 }}>
          <EmailInput
            value={personalWebsite}
            onChange={(e: any) => setPersonalWebsite(e.target.value)}
          />
        </div>
      </EditPageRow>
      <EditPageRow>
        <div style={{ flex: 1 }}>
          <Label > Current employer: </Label>
        </div>
        <div style={{ flex: 3 }}>
          <EmailInput
            value={currentEmployer}
            onChange={(e: any) => setCurrentEmployer(e.target.value)} />
        </div>
      </EditPageRow>
      <EditPageRow>
        <div style={{ flex: 1 }}>
          <Button onClick={() => handleEdit()}>Confirm</Button>
        </div>

        <div style={{ flex: 1 }}>
          <Button style={{ backgroundColor: 'red' }} onClick={() => cancel()}>Cancel</Button>
        </div>
      </EditPageRow>


    </Container>
  )
}

export default UpdateCandidate