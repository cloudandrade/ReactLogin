import axios from 'axios';

//criar metodo de cadastro

//criar metodo de login que irá retornar o token na requisicao

//

const api = axios.create({
	baseURL: 'http://localhost:8080/api/',
});

export default api;

/* export default const api = axios.create({
	baseURL: process.env.SERVER_HOST,
});

export const cadastrar = usuario => {
	console.log('entoru no service');
	return api.post('/auth/signup', usuario);
};
 */
