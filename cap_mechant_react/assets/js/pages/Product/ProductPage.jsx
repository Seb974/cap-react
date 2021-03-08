import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import ProductActions from '../../services/ProductActions';
import CategoryActions from '../../services/CategoryActions';

const ProductPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    const [product, setProduct] = useState({name: "", description: "", category: "", picture: ""});
    const [errors, setErrors] = useState({name: "", description: "", category: "", picture: ""});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchDatas(id);
    }, []);

    useEffect(() => {
        fetchDatas(id);
    }, [id]);

    const fetchDatas = async id => {
        let backEndCategories = categories.length === 0 ? await fetchCategories() : categories;
        if (id !== "new") {
            setEditing(true);
            await fetchProduct(id);
        } else {
            setProduct({
                ...product, 
                category: backEndCategories[0].id,
            });
        }
    }

    const fetchProduct = async id => {
        try {
            const { name, description, category } = await ProductActions.find(id);
            setProduct({ name, description, category: category.id });
        } catch (error) {
            console.log(response.error);
            // TODO : Notification flash d'une erreur
            history.replace("/products");
        }
    }

    const fetchCategories = async () => {
        let response = [];
        try {
            const data = await CategoryActions.findAll();
            setCategories(data);
            if (!product.category) {
                setProduct({...product, category: data[0].id});
            }
            response = data;
        } catch(error) {
            console.log(error.response);
            // TODO : Notification flash d'une erreur
            history.replace("/products");
        }
        return response;
    }

    const handleChange = ({ currentTarget }) => {
        setProduct({...product, [currentTarget.name]: currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = !editing ? ProductActions.create(product) : ProductActions.update(id, product);
        request.then(response => {
                    setErrors({});
                    //TODO : Flash notification de succès
                    history.replace("/products");
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
            <h1>{!editing ? "Créer un produit" : "Modifier '" + product.name + "'"}</h1>

            <form onSubmit={ handleSubmit }>
                <Field
                    name="name"
                    label="Nom"
                    value={ product.name }
                    onChange={ handleChange }
                    placeholder="Nom du produit"
                    error={ errors.name }
                />
                <Select name="category" label="Catégorie" value={ product.category } error={ errors.category } onChange={ handleChange }>
                    { categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
                </Select>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
            <div className="row">
                <Link to="/products" className="btn btn-link">Retour à la liste</Link>
            </div>
        </>
    );
}
 
export default ProductPage;