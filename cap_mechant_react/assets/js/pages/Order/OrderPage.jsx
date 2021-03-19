import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import CartActions from '../../services/CartActions';

const OrderPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    const [order, setOrder] = useState({name: "", shorthand: ""});
    const [errors, setErrors] = useState({name: "", shorthand: ""});

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchOrder(id);
        }
    }, [id]);

    const fetchOrder = async id => {
        try {
            const { name, shorthand } = await CartActions.find(id);
            setOrder({ name, shorthand });
        } catch (error) {
            console.log(response.error);
            // TODO : Notification flash d'une erreur
            history.replace("/orders");
        }
    }

    const handleChange = ({ currentTarget }) => {
        setOrder({...order, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = !editing ? CartActions.create(order) : CartActions.update(id, order);
        request.then(response => {
                    setErrors({});
                    //TODO : Flash notification de succès
                    history.replace("/orders");
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
            <h1>{!editing ? "Créer une commande" : "Modifier '" + order.name + "'"}</h1>

            <form onSubmit={ handleSubmit }>
                <Field 
                    name="name"
                    label="Nom"
                    value={ order.name }
                    onChange={ handleChange }
                    placeholder="Nom de la commande"
                    error={ errors.name }
                />
                <Field 
                    name="shorthand"
                    label="Diminutif"
                    value={ order.shorthand }
                    onChange={ handleChange }
                    placeholder="Diminutif"
                    error={ errors.shorthand }
                />
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
            <div className="row">
                <Link to="/orders" className="btn btn-link">Retour à la liste</Link>
            </div>
        </>
    );
}
 
export default OrderPage;