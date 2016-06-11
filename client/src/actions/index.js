import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
	return function(dispatch) {
		// submit email/pw to srvr
		axios.post(`${ROOT_URL}/signin`, { email,password })
			.then(response =>{
			// if req is good.
			// -UPDATE STATE indicate user is AUTH reduxThunk
			dispatch({ type: AUTH_USER });
			// -SAVE JWT TOKEN
			localStorage.setItem('token', response.data.token);
			// redirect to route / feature
				browserHistory.push('/feature');
			})
			.catch( () => {
			// if req is bad...
			// show error to user
			dispatch(authError('Bad Login Info'));
			});
	} 
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	return { 
		type: UNAUTH_USER
	}
}