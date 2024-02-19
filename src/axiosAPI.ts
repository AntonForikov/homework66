import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://anton-forikov-default-rtdb.europe-west1.firebasedatabase.app',
});

export default axiosAPI;