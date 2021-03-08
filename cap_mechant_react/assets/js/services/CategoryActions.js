import axios from 'axios';

function findAll() {
    return axios
        .get('/api/categories')
        .then(response => response.data['hydra:member']);
}

function deleteCategory(id) {
    return axios
        .delete('/api/categories/' + id);
}

function find(id) {
    return axios.get('/api/categories/' + id)
                .then(response => response.data);
}

function update(id, category) {
    return axios.put('/api/categories/' + id, category)
}

function create(category) {
    return axios.post('/api/categories', category);
}

export default { 
    findAll,
    delete: deleteCategory,
    find, 
    update, 
    create
}