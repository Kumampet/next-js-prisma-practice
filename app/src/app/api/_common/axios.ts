import axios, { AxiosResponse, AxiosError } from 'axios';

const Axios = () => {
  const _axios = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000
  });

  const get = (
    path: string,
    params: object,
    successed?: (res: object) => void,
    errored?: (res: object) => void,
  ) => {
    return _axios
      .get(path, { params: params })
      .then((result: AxiosResponse) => {
        if (successed) {
          successed(result);
        } else {
          return result;
        }
      })
      .catch((error: AxiosError) => {
        if (errored) {
          errored(error);
        } else {
          return error;
        }
      });
  }

  const post = (
    path: string,
    params: object,
    successed?: (res: object) => void,
    errored?: (res: object) => void,
  ) => {
    return _axios
      .post(path, params)
      .then((result: AxiosResponse) => {
        if (successed) {
          successed(result);
        } else {
          return result;
        }
      })
      .catch((error: AxiosError) => {
        if (errored) {
          errored(error);
        } else {
          return error;
        }
      });
  }

  // deleteが変数にできないので
  const remove = (
    path: string,
    params: object,
    successed?: (res: object) => void,
    errored?: (res: object) => void,
  ) => {
    return _axios
      .delete(path, { data: { params } })
      .then((result: AxiosResponse) => {
        if (successed) {
          successed(result);
        } else {
          return result;
        }
      })
      .catch((error: AxiosError) => {
        if (errored) {
          errored(error);
        } else {
          return error;
        }
      });
  }
  return {
    get,
    post,
    remove,
  }
}

export default Axios;