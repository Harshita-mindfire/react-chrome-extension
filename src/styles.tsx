import styled from 'styled-components';

interface SpinnerProps {
  isLoading: boolean;
}
export const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Label = styled.label`
  font-size: 18px;
  margin-bottom: 16px;
`;

export const EmailDropdown = styled.select`
  height: 43px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0 32px;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  width: auto;
  border: none;
  height: 40px;
  border-radius: 6px;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  background-color: #44969C;
  min-width: 30%;
  color: white;
`;
export const EmailInput = styled.input`
  height: 50px;
  border: 1px solid #000;
  border-radius: 6px;
  padding: 0 32px;
  font-size: 16px;
  margin-bottom: 16px;
`;


export const RowContainer = styled.div`
  display: flex;
  max-width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Column = styled.div`
  flex: 1;
  text-align: center;
`;

export const ActionButton = styled.button`
  background-color: #D9D9D9;
  width: 100%;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  font-weight: bold;
`;
export const SavedPagesList = styled.div`
  width: 100%;
`;
export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 16px;
`;
export const UserInfo = styled.label`
  margin-right: 16px;
  font-size: 14px;
`;
export const Spinner = styled.div<SpinnerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
  backdrop-filter: blur(5px); /* Adjust the blur amount as needed */
  background-color: rgba(255, 255, 255, 0.8); /* Adjust the background color and opacity as needed */
  z-index: 999; /* Ensure it appears above other content */
`;
export const EditPageRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 5px;
`;
