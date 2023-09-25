import { useState } from 'react';
import './App.css';

import SetUser from './SetUser';
import SearchByEmail from './SearchByEmail';
import SavedPages from './SavedPages';

function App() {
  const saveHtmlContent = () => {
    if (chrome?.tabs) {
      console.log('inside tabs');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(
          tabs[0].id!,
          { code: 'document.documentElement.outerHTML' },
          (response) => {
            console.log('inside execution');
            const htmlContent = response ? response[0] : '';
            const blob = new Blob([htmlContent], { type: 'text/html' });
            console.log(blob);
          }
        );
      });
    }
  };
  const [stage, setStage] = useState(1); // Initialize with the default stage

  // Render the view based on the stage
  const renderView = () => {
    switch (stage) {
      case 1:
        return <SetUser switchState={() => setStage(stage + 1)} />;
      case 2:
        return <SearchByEmail switchState={() => setStage(stage + 1)} />;
      case 3:
        return <SavedPages />;

    }
  };
  return (
    <div>
      {/* <button onClick={() => setStage(1)}>View 1</button>
      <button onClick={() => setStage(2)}>View 2</button>
      <button onClick={() => setStage(3)}>View 3</button>
      <button onClick={() => setStage(4)}>View 4</button>
       */}
      {/* Render the selected view */}
      {renderView()}
    </div>
  );
}

export default App;
