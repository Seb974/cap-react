import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import UnitActions from '../../services/UnitActions';

const UnitPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    const [unit, setUnit] = useState({name: "", shorthand: ""});
    const [errors, setErrors] = useState({name: "", shorthand: ""});

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchUnit(id);
        }
    }, [id]);

    const fetchUnit = async id => {
        try {
            const { name, shorthand } = await UnitActions.find(id);
            setUnit({ name, shorthand });
        } catch (error) {
            console.log(response.error);
            // TODO : Notification flash d'une erreur
            history.replace("/units");
        }
    }

    const handleChange = ({ currentTarget }) => {
        setUnit({...unit, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = !editing ? UnitActions.create(unit) : UnitActions.update(id, unit);
        request.then(response => {
                    setErrors({});
                    //TODO : Flash notification de succès
                    history.replace("/units");
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
            <h1>{!editing ? "Créer une unité" : "Modifier '" + unit.name + "'"}</h1>

            <form onSubmit={ handleSubmit }>
                <Field 
                    name="name"
                    label="Nom"
                    value={ unit.name }
                    onChange={ handleChange }
                    placeholder="Nom de l'unité"
                    error={ errors.name }
                />
                <Field 
                    name="shorthand"
                    label="Diminutif"
                    value={ unit.shorthand }
                    onChange={ handleChange }
                    placeholder="Diminutif"
                    error={ errors.shorthand }
                />
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
            <div className="row">
                <Link to="/units" className="btn btn-link">Retour à la liste</Link>
            </div>
        </>
    );
}
 
export default UnitPage;