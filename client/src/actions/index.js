import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
	return function(dispatch) {
		// submit email/pw to srvr
		axios.post(`${ROOT_URL}/signin`, {email,password})
		.then(response =>{
		// if req is good.
		dispatch({ type: AUTH_USER });
		// auth user, save jwt token
			
		// redirect to route / feature
			browserHistory.push('/feature');
		})
		.catch( () => {
		// if req is bad...
		// show error

			
		})
	} 
}