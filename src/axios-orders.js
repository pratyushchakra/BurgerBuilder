import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-35938.firebaseio.com/'
});

export default instance