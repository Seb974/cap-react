import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthActions from '../../services/AuthActions';
import AuthContext from '../../contexts/AuthContext';
import Field from '../../components/forms/Field';

const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        setCredentials({...credentials, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthActions.authenticate(credentials)
                   .then(response => {
                       setError("");
                       setIsAuthenticated(true);
                       history.replace("/");
                    })
                   .catch(error => setError("Paramètres de connexion invalides"));
    }

    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={ handleSubmit }>
                <Field 
                    name="username" 
                    label="Adresse email" 
                    value={ credentials.username } 
                    onChange={ handleChange } 
                    placeholder="Adresse email de connexion" 
                    type="email" 
                    error={error}
                />
                <Field 
                    name="password" 
                    label="Mot de passe" 
                    value={ credentials.password } 
                    onChange={ handleChange } 
                    type="password"
                />
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Je me connecte</button>
                </div>
            </form>
            <div className="row">
                <Link to="/register" className="btn btn-link">Créer un compte</Link>
            </div>
        </>
    );
}
 
export default LoginPage;