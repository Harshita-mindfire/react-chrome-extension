import axios from 'axios';

// const BASE_URL = 'https://p6jx3vgupd.us-east-1.awsapprunner.com/extension'
const BASE_URL = 'http://localhost:3000/extension'


export const getCandidateId = async (email: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${email}`)
    return response.data.candidateId;
  }
  catch (err) {
    console.log(err)
  }
}
export const getCandidatePages = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/candidate-pages`)
    return response.data.pages;
  }
  catch (err) {
    console.log(err)
  }
}
export const deletePage = async (candidateId: string, pageId: string) => {
  try {
    await axios.delete(`${BASE_URL}/${candidateId}/candidate-pages/${pageId}`)
  }
  catch (err) {
    console.log(err)
  }
}

export const uploadHTMLToS3 = async (html: string, url: string) => {
  try {
    await await axios.put(url, html);
  }
  catch (err) {
    console.log(err)
  }
}


export const createUserPage = async (id: string, savedBy: string, pageName: string, pageUrl: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/${id}/candidate-pages`, { savedBy, pageName, pageUrl })
    return response.data;
  }
  catch (err) {
    console.log(err)
  }
}