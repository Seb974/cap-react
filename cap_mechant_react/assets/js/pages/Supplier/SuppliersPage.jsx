import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import SupplierActions from '../../services/SupplierActions';

const SuppliersPage = (props) => {

    const [suppliers, setSuppliers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 2;
    const filteredSuppliers = suppliers.filter(supplier => supplier.name !== undefined && (supplier.name.toUpperCase()).includes(search.toUpperCase()) )
    const paginatedSuppliers = Pagination.getData(filteredSuppliers, currentPage, itemsPerPage);

    useEffect(() => {
        SupplierActions.findAll()
                .then(response => setSuppliers(response))
                .catch(error => console.log(error.response));
    }, []);

    const handleDelete = (id) => {
        const originalSuppliers = [...suppliers];
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        SupplierActions.delete(id)
                       .catch(error => {
                            setSuppliers(originalSuppliers);
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
                <h1>Liste des fournisseurs</h1>
                <Link to="/suppliers/new" className="btn btn-success">Créer un fournisseur</Link>
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
                    { paginatedSuppliers.length === 0 ? <tr><td colSpan="3">Aucune donnée à afficher.</td></tr> : paginatedSuppliers.map(supplier => {
                         return (
                            <tr key={ supplier.id }>
                                <td><Link to={"/suppliers/" + supplier.id}>{ supplier.name }</Link></td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(supplier.id)}>Supprimer</button>
                                </td>
                            </tr>
                         );
                    }) }
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredSuppliers.length}/>
        </>
    );
}
 
export default SuppliersPage;