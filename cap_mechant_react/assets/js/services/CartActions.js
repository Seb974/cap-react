import axios from 'axios';

function getStatus() {
    return [
        {value: "TOUS", label: "Tous"},
        {value: "WAITING", label: "En attente"},
        {value: "VALIDATED", label: "Validée"},
        // {value: "CLOSED", label: "Terminée"}
    ];
}

function getDefaultStatus() {
    return "WAITING";
}

function getNextStatus(actualStatus) {
    const status = getStatus();
    const statusIndex = status.findIndex(state => state.value === actualStatus);
    const i = statusIndex === status.length - 1 ? statusIndex : statusIndex + 1;
    return status[i].value;
}

function isLastState(actualStatus) {
    const status = getStatus();
    const statusIndex = status.findIndex(state => state.value === actualStatus);
    return statusIndex === status.length - 1;
}

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

function findFromRange(status, from, to) {
    const query = status.toUpperCase() === "TOUS" ? 
        `deliveryDate[strictly_after]=${ getStringDate(from) }&deliveryDate[strictly_before]=${ getStringDate(to) }` :
        `status=${ status }&deliveryDate[strictly_after]=${ getStringDate(from) }&deliveryDate[strictly_before]=${ getStringDate(to) }`;
    return axios
        .get(`/api/carts?${ query }`)
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
    const nextStatus = getNextStatus(cart.status);
    return axios.put('/api/carts/' + id, {...cart, sendingNumber: (cart.sendingNumber + 1), status: nextStatus, items: cart.items.map(item => { 
        return {...item, supplier: `/api/suppliers/${ typeof item.supplier === 'object' && item.supplier !== null ? item.supplier.id : item.supplier }`};
    })});
}

function sendToOtherSupplier(id, cart, items) {
    update(id, cart).then(response => {
        return axios.post('/api/order/notify', { id: cart.id, selectedItems : items })
                    .then(r => response);
    });
}

// function create(cart) {
//     return axios.post('/api/carts', cart);
// }

function getStringDate(date) {
    return date.getFullYear() + "-" + getTwoDigits(date.getMonth() + 1) + "-" + getTwoDigits(date.getDate());
}

function getTwoDigits(number) {
    return number < 10 ? '0' + number : number;
}

export default {
    getStatus,
    isLastState,
    getDefaultStatus,
    send,
    get,
    add,
    remove,
    removeAll, 
    findAll,
    findFromRange,
    find,
    delete: deletecart,
    update,
    sendToOtherSupplier
    // create
}