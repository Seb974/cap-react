import axios from 'axios';

function findAll() {
    return axios
        .get('/api/units')
        .then(response => response.data['hydra:member']);
}

function deleteUnit(id) {
    return axios
        .delete('/api/units/' + id);
}

function find(id) {
    return axios.get('/api/units/' + id)
                .then(response => response.data);
}

function update(id, unit) {
    return axios.put('/api/units/' + id, unit)
}

function create(unit) {
    return axios.post('/api/units', unit);
}

export default { 
    findAll,
    delete: deleteUnit,
    find, 
    update, 
    create
}