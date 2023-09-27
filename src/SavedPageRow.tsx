import { RowContainer, Column, ActionButton } from "./styles";


const SavedPageRow = ({ name, url, onDelete, onOpen, htmlUrl }: any) => {
  const oepnUrl = () => {
    chrome.tabs.create({ url: url });
  }
  const oepnHTML = () => {
    chrome.tabs.create({ url: htmlUrl });
  }
  return (
    <RowContainer>
      <Column style={{ flex: 2 }} >
        <label style={{ maxWidth: '100%' }}>
          {name}
        </label>
      </Column>
      {/* <Column>{date}</Column> */}
      <Column >
        <ActionButton onClick={() => oepnUrl()}>Open URL</ActionButton>
      </Column>
      <Column >
        <ActionButton onClick={() => oepnHTML()}>Open HTML</ActionButton>
      </Column>
      <Column>
        <ActionButton onClick={() => onDelete()}>Delete</ActionButton>
      </Column>
    </RowContainer>
  );
};

export default SavedPageRow;
