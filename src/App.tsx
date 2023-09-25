import './App.css';

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

  return (
    <div className="App">
      <button onClick={saveHtmlContent}>Save HTML Content</button>
    </div>
  );
}

export default App;
