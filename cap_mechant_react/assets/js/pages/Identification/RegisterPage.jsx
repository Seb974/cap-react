import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import UserActions from '../../services/UserActions';

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({name:"", email: "", password: "", confirmPassword: ""});
    const [errors, setErrors] = useState({name:"", email: "", password: "", confirmPassword: ""});

    const handleChange = ({currentTarget}) => {
        setUser({...user, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const apiErrors = {};
        if (user.password !== user.confirmPassword) {
            apiErrors.confirmPassword = "Les mots de passe saisis ne correspondent pas";
            setErrors(apiErrors);
            return ;
        }

        try {
            UserActions.register(user);
            setErrors({});
            history.replace('/');
        } catch ({response}) {
            const { violations } = response.data;
            if (violations) {
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
            //TODO : Flash notification d'erreur
        }
    }

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={ handleSubmit }>
                <Field
                    name="name"
                    label="Nom"
                    value={ user.name }
                    error={ errors.name }
                    onChange={ handleChange }
                />
                <Field
                    name="email"
                    type="email"
                    label="Adresse email"
                    value={ user.email }
                    error={ errors.email }
                    onChange={ handleChange }
                />
                <Field
                    name="password"
                    type="password"
                    label="Mot de passe"
                    value={ user.password }
                    error={ errors.password }
                    onChange={ handleChange }
                />
                <Field
                    name="confirmPassword"
                    type="password"
                    label="Confirmation"
                    placeholder="Confirmation du mot de passe"
                    value={ user.confirmPassword }
                    error={ errors.confirmPassword }
                    onChange={ handleChange }
                />
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Confirmer</button>
                </div>
            </form>
            <div className="row">
                <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
            </div>
        </>
    );
}
 
export default RegisterPage;