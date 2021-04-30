import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/api/users/";

class Service {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  registerDriver(name, email, password) {
    return axios.post(API_URL + "register", {
      name,
      email,
      password
    });
  }

  registerAdmin(name, email, password) {
    return axios.post(API_URL + "adminRegister", {
      headers: authHeader(),
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    var token, jwt;
    if(user) token = user.token;
    if(token) jwt = JSON.parse(atob(token.split('.')[1]));
    
    if(jwt && jwt.exp && Date.now() < jwt.exp*1000){
      return user;
    }
    if(jwt && jwt.exp && Date.now() >= jwt.exp*1000){
      localStorage.removeItem("user");
      window.location.reload();
    }
    return null;
  }

  getPublicContent() {
    return axios.get("/");
  }

}

export default new Service();