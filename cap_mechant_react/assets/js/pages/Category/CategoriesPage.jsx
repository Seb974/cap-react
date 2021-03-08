import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import CategoryActions from '../../services/CategoryActions';

const CategoriesPage = (props) => {

    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 2;
    const filteredCategories = categories.filter(category => category.name !== undefined && (category.name.toUpperCase()).includes(search.toUpperCase()) )
    const paginatedCategories = Pagination.getData(filteredCategories, currentPage, itemsPerPage);

    useEffect(() => {
        CategoryActions.findAll()
                .then(response => setCategories(response))
                .catch(error => console.log(error.response));
    }, []);

    const handleDelete = (id) => {
        const originalCategories = [...categories];
        setCategories(categories.filter(category => category.id !== id));
        CategoryActions.delete(id)
                       .catch(error => {
                            setCategories(originalCategories);
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
                <h1>Liste des catégories</h1>
                <Link to="/categories/new" className="btn btn-success">Créer une catégorie</Link>
            </div>

            <SearchBar value={ search } onSearch={ handleSearch } />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedCategories.length === 0 ? <tr><td colSpan="3">Aucune donnée à afficher.</td></tr> : paginatedCategories.map(category => {
                         return (
                            <tr key={ category.id }>
                                <td><Link to={"/categories/" + category.id}>{ category.name }</Link></td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category.id)}>Supprimer</button>
                                </td>
                            </tr>
                         );
                    }) }
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredCategories.length}/>
        </>
    );
}
 
export default CategoriesPage;