import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import UserActions from '../../services/UserActions';

const UsersPage = (props) => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 15;
    const filteredUsers = users.filter(user => user.email.toLowerCase().startsWith(search.toLowerCase()) )
    const paginatedUsers = Pagination.getData(filteredUsers, currentPage, itemsPerPage);

    useEffect(() => {
        UserActions.findAll()
                   .then(response => setUsers(response))
                   .catch(error => console.log(error.response));
    }, []);

    const handleDelete = (id) => {
        const originalUsers = [...users];
        setUsers(users.filter(user => user.id !== id));
        UserActions.delete(id)
                   .catch(error => {
                        setUsers(originalUsers);
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
                <h1>Liste des utilisateurs</h1>
                <Link to="/users/new" className="btn btn-success">Créer un utilisateur</Link>
            </div>

            <SearchBar value={ search } onSearch={ handleSearch } />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedUsers.length === 0 ? <tr><td colSpan="3">Aucune donnée à afficher.</td></tr> : paginatedUsers.map(user => {
                        return (
                            <tr key={ user.id }>
                                <td>{ user.id }</td>
                                <td><Link to={"/users/" + user.id}>{ user.name }</Link></td>
                                <td><Link to={"/users/" + user.id}>{ user.email }</Link></td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Supprimer</button>
                                </td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={users.length}/>
        </>
    );
}
 
export default UsersPage