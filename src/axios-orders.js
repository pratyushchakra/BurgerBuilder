import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-35938.firebaseio.com/'
});
// axios.defaults.headers.common['Access-Control-Request-Headers'] = 'Content-Type';
axios.defaults.headers.common['Content-Type'] = 'application/json';
export default instance