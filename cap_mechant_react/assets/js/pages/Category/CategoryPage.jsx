import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import CategoryActions from '../../services/CategoryActions';

const CategoryPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    const [category, setCategory] = useState({name: ""});
    const [errors, setErrors] = useState({name: ""});

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCategory(id);
        }
    }, [id]);

    const fetchCategory = async id => {
        try {
            const { name } = await CategoryActions.find(id);
            setCategory({ name });
        } catch (error) {
            console.log(response.error);
            // TODO : Notification flash d'une erreur
            history.replace("/categories");
        }
    }

    const handleChange = ({ currentTarget }) => {
        setCategory({...category, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = !editing ? CategoryActions.create(category) : CategoryActions.update(id, category);
        request.then(response => {
                    setErrors({});
                    //TODO : Flash notification de succès
                    history.replace("/categories");
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
            <h1>{!editing ? "Créer une catégorie" : "Modifier '" + category.name + "'"}</h1>

            <form onSubmit={ handleSubmit }>
                <Field 
                    name="name"
                    label="Nom"
                    value={ category.name }
                    onChange={ handleChange }
                    placeholder="Nom de la catégorie"
                    error={ errors.name }
                />
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
            <div className="row">
                <Link to="/categories" className="btn btn-link">Retour à la liste</Link>
            </div>
        </>
    );
}
 
export default CategoryPage;