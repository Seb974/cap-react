import axios from 'axios';

function get(products) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return getProductsFromIds(cart, products);
}

function add(product, quantity, products) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let newItem = cart.find(item => item.product.id === product.id);
    let newItems = newItem === undefined || cart.length === 0 ? 
            [...cart, {product: {id: product.id}, quantity: parseFloat(quantity)}] :
            [...cart.filter(item => item.product.id !== newItem.product.id), {...newItem, quantity: parseFloat(newItem.quantity) + parseFloat(quantity)}];
    localStorage.setItem('cart', JSON.stringify(newItems));
    return getProductsFromIds(newItems, products);
}

function remove(product, quantity, products) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let newItem = cart.find(item => item.product.id === product.id);
    let newItems = parseFloat(newItem.quantity) <= parseFloat(quantity) ?
        cart.filter(item => item.product.id !== newItem.product.id) :
        [...cart.filter(item => item.product.id !== newItem.product.id), {...newItem, quantity: parseFloat(newItem.quantity) - parseFloat(quantity)}];
    localStorage.setItem('cart', JSON.stringify(newItems));
    return getProductsFromIds(newItems, products);

}

function send(cart, user, date) {
    let data = {items: [...cart], user: {id: user.id}, deliveryDate: date};
    return axios.post('/api/order/new', data);
}

function removeAll() {
    localStorage.removeItem('cart');
    return [];
}

function getProductsFromIds(cart, products) {
    let cartItems = [];
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            let itemProduct = products.find(product => product.id == cart[i].product.id);
            if (itemProduct !== undefined) {
                cartItems = [ ...cartItems, { product: itemProduct, quantity: cart[i].quantity } ]
            }
        }
    }
    return cartItems.sort((a, b) => (a.product.id > b.product.id) ? 1 : -1);
}

function findAll() {
    return axios
        .get('/api/carts')
        .then(response => response.data['hydra:member']);
}

function deletecart(id) {
    return axios
        .delete('/api/carts/' + id);
}

function find(id) {
    return axios.get('/api/carts/' + id)
                .then(response => response.data);
}

function update(id, cart) {
    return axios.put('/api/carts/' + id, cart)
}

// function create(cart) {
//     return axios.post('/api/carts', cart);
// }

export default {
    send,
    get,
    add,
    remove,
    removeAll, 
    findAll,
    find,
    delete: deletecart,
    update,
    // create
}