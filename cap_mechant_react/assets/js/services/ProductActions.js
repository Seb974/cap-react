import axios from 'axios';

function findAll() {
    return axios
        .get('/api/products')
        .then(response => response.data['hydra:member']);
}

function deleteProduct(id) {
    return axios
        .delete('/api/products/' + id);
}

function find(id) {
    return axios.get('/api/products/' + id)
                .then(response => response.data);
}

function update(id, product) {
    return axios.put('/api/products/' + id, {...product, category: `/api/categories/${ product.category }`})
}

function create(product) {
    return axios.post('/api/products', {...product, category: `/api/categories/${ product.category }`, picture: null});
}

export default { 
    findAll,
    delete: deleteProduct,
    find, 
    update, 
    create
}