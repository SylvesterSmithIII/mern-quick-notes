import sendRequest from './send-request';
const BASE_URL = '/api/users';

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
  }

export function getNotes() {
  return sendRequest(`${BASE_URL}/notes`);
}

export function addNote(notesObj) {
  return sendRequest(`${BASE_URL}/notes/create`, 'POST', notesObj)
}

export function deleteNote(note) {
  console.log('here')
  return sendRequest(`${BASE_URL}/notes/delete`, 'DELETE', note)
}