import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import UnitActions from '../../services/UnitActions';

const UnitsPage = (props) => {

    const [units, setUnits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 2;
    const filteredUnits = units.filter(unit => unit.name !== undefined && (unit.name.toUpperCase()).includes(search.toUpperCase()) )
    const paginatedUnits = Pagination.getData(filteredUnits, currentPage, itemsPerPage);

    useEffect(() => {
        UnitActions.findAll()
                .then(response => setUnits(response))
                .catch(error => console.log(error.response));
    }, []);

    const handleDelete = (id) => {
        const originalUnits = [...units];
        setUnits(units.filter(unit => unit.id !== id));
        UnitActions.delete(id)
                       .catch(error => {
                            setUnits(originalUnits);
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
                <h1>Liste des unités</h1>
                <Link to="/units/new" className="btn btn-success">Créer une unité</Link>
            </div>

            <SearchBar value={ search } onSearch={ handleSearch } />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Diminutif</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedUnits.length === 0 ? <tr><td colSpan="3">Aucune donnée à afficher.</td></tr> : paginatedUnits.map(unit => {
                         return (
                            <tr key={ unit.id }>
                                <td><Link to={"/units/" + unit.id}>{ unit.name }</Link></td>
                                <td><Link to={"/units/" + unit.id}>{ unit.shorthand }</Link></td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(unit.id)}>Supprimer</button>
                                </td>
                            </tr>
                         );
                    }) }
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredUnits.length}/>
        </>
    );
}
 
export default UnitsPage;