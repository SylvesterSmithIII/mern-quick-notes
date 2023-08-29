// Service modules export buisiness/app logic
// such as managing tokens,  etc.
// Service modules ofteb depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from './users-api'

export function getToken() {
    const token = localStorage.getItem('token')
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        // Token has expired - remove it from localStorage
        localStorage.removeItem('token');
        return null;
  }
  return token;
}

export function getUser() {
    const token = getToken()

    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function login(credentials) {
    
    const token = await usersAPI.login(credentials)

    if (token) localStorage.setItem('token', token)

    return getUser()
}

export function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
      // checkToken returns a string, but let's 
      // make it a Date object for more flexibility
      .then(dateStr => new Date(dateStr));
  }