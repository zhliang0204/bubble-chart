import axios from 'axios';

class AxiosClient {
  constructor(config = {}) {
    const {
      baseURL = '',
      headers = { 'Content-Type': 'application/json' },
    } = config;

    const axiosInstance = axios.create({
      baseURL,
      headers,
    });
    this.client = axiosInstance;
  }

  get(url) {
    return this.client
      .get(url)
      .then((response) => response.data)
      .catch(errorHandler);
  }
}

const errorHandler = (error) => {
  if (error.response) {
    const { data } = error.response;
    throw data.message;
  } else {
    throw error;
  }
};

export default new AxiosClient({
  baseURL: 'http://demo0377384.mockable.io/funding-test',
});
