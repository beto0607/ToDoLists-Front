//TOKEN FUNCTIONS
export const setTokenData = ({ token, token_expires }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('token_expires', token_expires);
};
export const getToken = () => localStorage.getItem('token', null);
export const getTokenExpiration = () => localStorage.getItem('token_expires');

//USER FUNCTIONS
export const setUserData = ({ user_id, username, email, name }) => {
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
};
export const getUserId = () => localStorage.getItem('user_id', '-1');
export const getUsername = () => localStorage.getItem('username');
export const getUserName = () => localStorage.getItem('name');
export const getUserEmail = () => localStorage.getItem('email');
export const checkIfUserLoggedIn = () => getToken() != null && new Date(getTokenExpiration()) > new Date();

//API CALLS FUNCTIONS
const headers = new Headers({
    "Content-type": "application/json",
    "Authorization": String.raw`Basic ${getToken()}`
});

const fromAPI = (url, data={},success, error, method='GET') => {
    fetch(url,
        {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        }
    )
        .then(response => response.json())
        .then( data => success(data))
        .catch(err => error(err));
}
export const doGET = (url, success, error) => fromAPI(url, success, error, 'GET');
export const doPOST = (url, data, success, error) => fromAPI(url, data, success, error, 'POST');
export const doPUT = (url, data, success, error) => fromAPI(url, data, success, error, 'PUT');
export const doPATCH = (url, data, success, error) => fromAPI(url, data, success, error, 'PATCH');
export const doDELETE = (url, success, error) => fromAPI(url, success, error, 'DELETE');

//URLs GETTERS
const API_URL_BASE = (process && process.env.API_URL_BASE) ||'http://localhost:3001/';

//AUTH - POST
export const getLoginURL = () => String.raw`${API_URL_BASE}auth/login`;
//USERS - GET(index), POST
export const getUsersURL = () => String.raw`${API_URL_BASE}users`;
//USER - GET(show), PUT, PATCH, DELETE
export const getUserURL = (userID) => String.raw`${getUsersURL()}/${userID}`;
//LIST - GET(index), POST
export const getUserListsURL = (userID) => String.raw`${getUsersURL(userID)}/lists`;
//LIST - GET(show), DELETE, PATCH, PUT
export const getListURL = (listID) => String.raw`${API_URL_BASE}lists/${listID}`;
//ITEM - GET(index), POST
export const getListItemsURL = (listID) => String.raw`${getListURL(listID)}/items`;
//ITEM - PUT, PATCH, DELETE
export const getItemURL = (itemID) => String.raw`${API_URL_BASE}items/${itemID}`;
//ITEM - PUT, PATCH
export const getItemResolveURL = (itemID) => String.raw`${getItemURL(itemID)}/resolve`;
//ITEM - PUT, PATCH
export const getItemUnsolveURL = (itemID) => String.raw`${getItemURL(itemID)}/unsolve`;
//COMMENT - GET(index), POST
export const getListCommentsURL = (listID) => String.raw`${getListURL(listID)}/comments`;
//COMMENT - PUT, PATCH, DELETE
export const getCommentURL = (commentID) => String.raw`${API_URL_BASE}comments/${commentID}`;