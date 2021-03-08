import React from 'react';
import Field from './forms/Field';

const ContactPanel = ({ user, phone, onUserChange, onPhoneChange, errors, editing = true }) => {

    const handleChange = ({ currentTarget }) => {
        onPhoneChange(currentTarget.value);
    };

    const handleUserChange = ({ currentTarget }) => {
        onUserChange({...user, [currentTarget.name]: currentTarget.value});
    };

    return (
        <>
            <div className="row"><h4>Contact</h4></div>
            <div className="row mb-5">
                <div className="col-md-4">
                    <Field 
                        name="name"
                        label=" "
                        value={ user.name }
                        onChange={ handleUserChange }
                        placeholder="Nom du site"
                        error={ errors.name }
                    />
                </div>
                <div className="col-md-4">
                    <Field 
                        name="email"
                        type="email"
                        label=" "
                        value={ user.email }
                        onChange={ handleUserChange }
                        placeholder="Adresse email"
                        error={ errors.email }
                    />
                </div>
                <div className="col-md-4">
                    <Field 
                        type="tel"
                        name="phone"
                        label=" "
                        value={ phone }
                        onChange={ handleChange }
                        placeholder="N° de téléphone"
                        error={ errors.phone }
                    />
                </div>
            </div>
            { !editing &&
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            name="password"
                            type="password"
                            label="Mot de passe"
                            value={ user.password }
                            error={ errors.password }
                            onChange={ handleUserChange }
                        />
                    </div>
                    <div className="col-md-6 mb-5">
                        <Field
                            name="confirmPassword"
                            type="password"
                            label="Confirmation"
                            placeholder="Confirmation du mot de passe"
                            value={ user.confirmPassword }
                            error={ errors.confirmPassword }
                            onChange={ handleUserChange }
                        />
                    </div>
                </div>
            }
        </>
    );
}
 
export default ContactPanel;