import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import SupplierActions from '../../services/SupplierActions';

const SupplierPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    const [supplier, setSupplier] = useState({name: "", email: "", phone: ""});
    const [errors, setErrors] = useState({name: "", email: "", phone: ""});

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchSupplier(id);
        }
    }, [id]);

    const fetchSupplier = async id => {
        try {
            const { name, email, phone } = await SupplierActions.find(id);
            setSupplier({ name, email, phone });
        } catch (error) {
            console.log(response.error);
            // TODO : Notification flash d'une erreur
            history.replace("/suppliers");
        }
    }

    const handleChange = ({ currentTarget }) => {
        setSupplier({...supplier, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = !editing ? SupplierActions.create(supplier) : SupplierActions.update(id, supplier);
        request.then(response => {
                    setErrors({});
                    //TODO : Flash notification de succès
                    history.replace("/suppliers");
                })
               .catch( ({ response }) => {
                    const { violations } = response.data;
                    if (violations) {
                        const apiErrors = {};
                        violations.forEach(({propertyPath, message}) => {
                            apiErrors[propertyPath] = message;
                        });
                        setErrors(apiErrors);
                    }
                     //TODO : Flash notification d'erreur
               });
    }

    return (
        <>
            <h1>{!editing ? "Créer un fournisseur" : "Modifier '" + supplier.name + "'"}</h1>

            <form onSubmit={ handleSubmit }>
                <Field 
                    name="name"
                    label=" "
                    value={ supplier.name }
                    onChange={ handleChange }
                    placeholder="Nom du fournisseur"
                    error={ errors.name }
                />
                <Field 
                    name="email"
                    type="email"
                    label=" "
                    value={ supplier.email }
                    onChange={ handleChange }
                    placeholder="Adresse email"
                    error={ errors.email }
                />
                <Field 
                    name="phone"
                    type="tel"
                    label=" "
                    value={ supplier.phone }
                    onChange={ handleChange }
                    placeholder="N° de téléphone"
                    error={ errors.phone }
                />
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
            <div className="row">
                <Link to="/suppliers" className="btn btn-link">Retour à la liste</Link>
            </div>
        </>
    );
}
 
export default SupplierPage;