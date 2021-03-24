import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import RoleActions from '../services/RoleActions';

const AdminRoute = ({ path, component }) => {
    const { isAuthenticated, currentUser } = useContext(AuthContext);
    return isAuthenticated && RoleActions.hasPrivileges(currentUser) ? <Route path={ path } component={ component } /> : <Redirect to="/" />
}
 
export default AdminRoute;