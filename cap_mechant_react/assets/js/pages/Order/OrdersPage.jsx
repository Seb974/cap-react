import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import CartActions from '../../services/CartActions';

const OrdersPage = (props) => {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 2;
    const filteredOrders = orders;  // .filter(order => order.status !== undefined && (order.status.toUpperCase()).includes(search.toUpperCase()) )
    const paginatedOrders = Pagination.getData(filteredOrders, currentPage, itemsPerPage);

    useEffect(() => {
        CartActions.findAll()
                   .then(response => {
                       setOrders(response);
                       console.log(response);
                })
                   .catch(error => console.log(error.response));

    }, []);

    const handleDelete = (id) => {
        const originalOrders = [...orders];
        setOrders(orders.filter(order => order.id !== id));
        CartActions.delete(id)
                       .catch(error => {
                            setOrders(originalOrders);
                            console.log(error.response);
                       });
    }

    const handlePageChange = page => setCurrentPage(page);

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des commandes</h1>
                {/* <Link to="/orders/new" className="btn btn-success">Créer une commande</Link> */}
            </div>

            <SearchBar value={ search } onSearch={ handleSearch } />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nom</th>
                        {/* <th>Diminutif</th> */}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedOrders.length === 0 ? <tr><td colSpan="3">Aucune donnée à afficher.</td></tr> : paginatedOrders.map(order => {
                         return (
                            <tr key={ order.id }>
                                <td><Link to={"/orders/" + order.id}>{ Date(order.deliveryDate).toLocaleString() }</Link></td>
                                {/* <td>{ order.status }</td> */}
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order.id)}>Supprimer</button>
                                </td>
                            </tr>
                         );
                    }) }
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredOrders.length}/>
        </>
    );
}
 
export default OrdersPage;