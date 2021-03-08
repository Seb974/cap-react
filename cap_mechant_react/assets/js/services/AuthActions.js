import axios from 'axios';
import jwtDecode from 'jwt-decode';

function authenticate(credentials) {
    return axios.post('/api/login_check', credentials)
                .then(response => response.data.token)
                .then(token => {
                    window.localStorage.setItem("authToken", token);
                    setAxiosToken(token);
                    return true;
                })
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers['Authorization'];
}

function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            return ;
        }
    }
    logout();
}

function setAxiosToken(token) {
    axios.defaults.headers['Authorization'] = "Bearer " + token;
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime())
            return true;
    }
    return false;
}

function getCurrentUser() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp, id, name, roles, email, metas } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime())
            return {id, email, name, roles: filterRoles(roles), metas} ;
    }
    return {id:-1, name: "", email: "", roles: ["ROLE_USER"], metas: null};
}

function filterRoles(roles) {
    if (roles.length > 1) {
        return roles.includes("ROLE_SUPER_ADMIN") ? "ROLE_SUPER_ADMIN" : 
               roles.includes("ROLE_ADMIN") ? "ROLE_ADMIN" : "ROLE_USER";
    }
    return ["ROLE_USER"];
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated, 
    getCurrentUser
}