import axios from 'axios';
import { Candidate } from './interfaces';

const BASE_URL = 'https://cn57vjkqst.us-east-1.awsapprunner.com/extension'
// const BASE_URL = 'http://localhost:3000/extension'


export const getCandidateIdByEmail = async (email: string, savedBy: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/email/${email}`, { savedBy })
    return response.data.candidateId;
  }
  catch (err) {
    console.log(err)
  }
}
export const getCandidateIdByUrl = async (url: string, savedBy: string) => {
  try {
    console.log(url, 'url')
    const response = await axios.post(`${BASE_URL}/url`, { url, savedBy })
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

export const uploadHTMLToS3 = async (html: any, url: string) => {
  try {
    await await axios.put(url, html);
  }
  catch (err) {
    console.log(err)
  }
}


export const createUserPage = async (id: string, savedBy: string, pageName: string, pageUrl: string, extension: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/${id}/candidate-pages`, { savedBy, pageName, pageUrl, extension })
    return response.data;
  }
  catch (err) {
    console.log(err)
  }
}

export const getCandidateById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/candidate/${id}`)
    return response.data.candidate;
  }
  catch (err) {
    console.log(err)
  }
}
export const editCandidate = async (id: string, body: Candidate) => {
  try {
    const response = await axios.put(`${BASE_URL}/candidate/${id}`, { ...body })
    return response.data.candidate;
  }
  catch (err) {
    console.log(err)
  }
}