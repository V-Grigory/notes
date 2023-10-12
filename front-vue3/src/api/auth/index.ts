import { LoginAPIInstance, DefaultAPIInstance } from "@/api";

export const AuthAPI = {
  /*
   *
   * @param {string} login
   * @param {string} password
   * @return {Promise<AxiosResponse<any>>}
   */
  login(login: string, password: string) {
    const url = "/login";
    const data = { login, password };
    return LoginAPIInstance.post(url, data);
  },

  /*
   *
   * @return {Promise<AxiosResponse<any>>}
   */
  logout() {
    const url = "/logout";
    return LoginAPIInstance.post(url);
  },
};
