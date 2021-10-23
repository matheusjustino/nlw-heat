import axios from 'axios';

const githubAxios = axios.create({
	headers: {
		Accept: 'application/json',
	},
});

export { githubAxios };
