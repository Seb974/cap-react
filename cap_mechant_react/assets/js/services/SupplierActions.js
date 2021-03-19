import axios from 'axios';

function findAll() {
    return axios
        .get('/api/suppliers')
        .then(response => response.data['hydra:member']);
}

function deleteSupplier(id) {
    return axios
        .delete('/api/suppliers/' + id);
}

function find(id) {
    return axios.get('/api/suppliers/' + id)
                .then(response => response.data);
}

function update(id, supplier) {
    return axios.put('/api/suppliers/' + id, supplier)
}

function create(supplier) {
    return axios.post('/api/suppliers', supplier);
}

export default { 
    findAll,
    delete: deleteSupplier,
    find, 
    update, 
    create
}