import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import RoleActions from '../../services/RoleActions';
import CategoryActions from '../../services/CategoryActions';
import SelectMultiple from '../../components/forms/SelectMultiple';

const CategoryPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const userRoles = RoleActions.getRoles();
    const [editing, setEditing] = useState(false);
    const [category, setCategory] = useState({name: "", userCategories: userRoles});
    const [errors, setErrors] = useState({name: "", userCategories: ""});

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCategory(id);
        }
    }, [id]);

    const fetchCategory = async id => {
        try {
            const { name, userCategories } = await CategoryActions.find(id);
            const defaultUsers = userCategories === null || userCategories === undefined ? userRoles : userRoles.filter(role => userCategories.includes(role.value));
            setCategory({ name, userCategories: defaultUsers });
        } catch (error) {
            console.log(response.error);
            // TODO : Notification flash d'une erreur
            history.replace("/categories");
        }
    }

    const handleChange = ({ currentTarget }) => {
        setCategory({...category, [currentTarget.name]: currentTarget.value});
    }

    const handleUsersChange = (userCategories) => {
        setCategory(category => {
            return {...category, userCategories};
        });
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
                <div className="row mb-3">
                    <div className="col-md-12">
                        <Field 
                            name="name"
                            label="Nom"
                            value={ category.name }
                            onChange={ handleChange }
                            placeholder="Nom de la catégorie"
                            error={ errors.name }
                        />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <SelectMultiple 
                            name="userCategories" 
                            label="Pour les utilisateurs" 
                            value={ category.userCategories } 
                            error={ errors.userCategories } 
                            onChange={ handleUsersChange } 
                            data={ userRoles }
                        />
                    </div>
                </div>
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