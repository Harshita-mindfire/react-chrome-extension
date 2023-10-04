import { createUserPage, getCandidateIdByEmail, getCandidateIdByUrl, uploadHTMLToS3 } from "./network";

export const isFileURL = (url: string) => {
  const fileExtensions = ['.pdf', '.jpg', '.jpeg'];
  const fileExtension = url!.split('.')!.pop()!.toLowerCase();
  return fileExtensions.includes(`.${fileExtension}`);
}
export const getHtmlContent = () => {
  return new Promise((resolve, reject) => {
    if (chrome?.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          reject('No active tabs found.');
          return;
        }
        chrome.tabs.executeScript(
          tabs[0].id!,
          { code: 'document.documentElement.outerHTML' },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              const htmlContent = response ? response[0] : '';
              const currentUrl = tabs[0].url;
              resolve({ html: htmlContent, url: currentUrl });
            }
          }
        );
      });
    } else {
      reject('chrome.tabs API not available.');
    }
  });
};
export const savePageService = async (candidateId: string, candidateEmail: string, loggedInUser: string, getCandidate: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (!chrome.runtime.lastError && tabs.length > 0) {
      const currentTab = tabs[0];
      const fileUrl = currentTab.url;
      const timestamp = new Date().getTime();
      if (isFileURL(fileUrl!)) {
        console.log(fileUrl)
        const fileExtension = fileUrl?.split('.').pop();
        const name = `${fileExtension}-${timestamp}`
        fetch(fileUrl!)
          .then((response) => response.blob())
          .then(async (blob) => {
            const resp = await createUserPage(candidateId, candidateEmail, name, fileUrl!, fileExtension!)
            const { preSignedUrl } = resp
            const reader = new FileReader();
            reader.onload = async () => {
              const arrayBuffer = reader.result;
              await uploadHTMLToS3(arrayBuffer, preSignedUrl)
              await getCandidate(candidateId)
            };
            reader.readAsArrayBuffer(blob);
          })
          .catch((error) => {
            console.error('Fetch Error:', error);
            // Handle the fetch error if needed
          });
      }
      else {
        const pageData = await getHtmlContent() as { html: string; url: string };
        const { html, url } = pageData
        const urlClass = new URL(url)
        const name = `${urlClass.hostname}-${timestamp}`
        const resp = await createUserPage(candidateId, loggedInUser, name, url, 'html')
        const { preSignedUrl } = resp
        await uploadHTMLToS3(html, preSignedUrl)
        await getCandidate(candidateId)
      }

    }
  });





}