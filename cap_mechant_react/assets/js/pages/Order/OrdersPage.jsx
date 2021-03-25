import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from '../../components/forms/Select';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import CartActions from '../../services/CartActions';
import RangeDatePicker from '../../components/forms/RangeDatePicker';

const OrdersPage = (props) => {

    const today = new Date();
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("TOUS");
    const [minDate, setMinDate] = useState(today);
    const [maxDate, setMaxDate] = useState(today);
    const messages = CartActions.getStatus();

    const itemsPerPage = 10;
    const filteredOrders = orders.filter( order => (order.user.name.toUpperCase().includes(search.toUpperCase())) );
    const paginatedOrders = Pagination.getData(filteredOrders, currentPage, itemsPerPage);

    useEffect(() => {
        fetchOrders(status, minDate, maxDate);
    }, []);

    const fetchOrders = (status, min, max) => {
        const minLimit = new Date(min.getFullYear(), min.getMonth(), min.getDate() -1, 23, 59, 59);
        const maxLimit = new Date(max.getFullYear(), max.getMonth(), max.getDate(), 23, 59, 59);
        CartActions.findFromRange(status, minLimit, maxLimit)
                   .then(response => {
                        setOrders(response);
                        setCurrentPage(1);
                   })
                   .catch(error => console.log(error.response));
    }

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

    const handleStatusChange = ({currentTarget}) => {
        fetchOrders(currentTarget.value, minDate, maxDate);
        setStatus(currentTarget.value);
    }

    const onDateChange = dates => {
        if (dates[1]) {
            fetchOrders(status, dates[0], dates[1]);
            setMinDate(dates[0]);
            setMaxDate(dates[1]);
        }
    };

    const displayStatus = status => {
        return (messages.find(statusObject => statusObject.value === status)).label;
    }

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des commandes</h1>
                {/* <Link to="/orders/new" className="btn btn-success">Créer une commande</Link> */}
            </div>

            <SearchBar value={ search } onSearch={ handleSearch } />

            <div className="row mb-4">
                <div className="col-md-6 row-date">
                    <RangeDatePicker minDate={ minDate } maxDate={ maxDate } onDateChange={ onDateChange } label={ "Date de commande" } className={ "order-datepicker" } />
                </div>
                <div className="col-md-6 ">
                    <Select name="status" label="Statut" value={ status } onChange={ handleStatusChange }>
                        { messages.map((message, index) => <option key={ index } value={ message.value }>{ message.label } </option>) }
                    </Select>
                </div>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>N° Commande</th>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedOrders.length === 0 ? <tr><td colSpan="3">Aucune donnée à afficher.</td></tr> : paginatedOrders.map(order => {
                        let date = new Date(order.deliveryDate);
                        return (
                            <tr key={ order.id }>
                                <td><Link to={"/orders/" + order.id}>{ order.id.toString().padStart(10, '0') }</Link></td>
                                <td><Link to={"/orders/" + order.id}>{ order.user.name }</Link></td>
                                <td>{ (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear() }</td>
                                <td>{ displayStatus(order.status) }</td>
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