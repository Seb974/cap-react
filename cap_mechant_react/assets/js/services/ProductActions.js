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

function update(id, product, suppliers) {
    return axios.put('/api/products/' + id, {...product, category: `/api/categories/${ product.category }`, suppliers: suppliers.map(supplier => `/api/suppliers/${ supplier.id }`), unit: `/api/units/${ product.unit }`})
}

function create(product, suppliers) {
    return axios.post('/api/products', {...product, category: `/api/categories/${ product.category }`, suppliers: suppliers.map(supplier => `/api/suppliers/${ supplier.id }`), unit: `/api/units/${ product.unit }`, picture: null});
}

export default { 
    findAll,
    delete: deleteProduct,
    find, 
    update, 
    create
}