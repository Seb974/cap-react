import axios from 'axios';

function register(user) {
    const { name, email, password } = user;
    return axios.post("/api/users", { name, email, password });
}

function findAll() {
    return axios
        .get('/api/users')
        .then(response => response.data['hydra:member']);
}

function deleteUser(id) {
    return axios
        .delete('/api/users/' + id);
}

function find(id) {
    return axios.get('/api/users/' + id)
                .then(response => response.data);
}

function update(id, user, metas) {
    const request = user.metas === null || user.metas === undefined || user.metas.length === 0 ?
                    axios.post('/api/metas', metas) :
                    axios.put('/api/metas/' + user.metas.id, metas);
    return request.then(response => {
            return axios.put('/api/users/' + id, {...user, metas: `/api/metas/${ response.data.id }`});
    });
}

function create(user) {
    const { name, email, password, metas } = user;
    return axios.post('/api/users', { name, email, password })
                .then(response => {
                    return metas !== null && metas !== undefined && metas.length > 0 ?
                        axios.put('/api/metas/' + response.data.metas.id, user.metas)
                             .then(data => {return response}) : response;
                });
}

export default {
    register,
    findAll,
    delete: deleteUser,
    find, 
    update, 
    create
}