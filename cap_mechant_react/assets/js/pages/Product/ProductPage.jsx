import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Field from '../../components/forms/Field';
import Select from '../../components/forms/Select';
import UnitActions from '../../services/UnitActions';
import ProductActions from '../../services/ProductActions';
import CategoryActions from '../../services/CategoryActions';
import SupplierActions from '../../services/SupplierActions';
import SupplierInput from '../../components/SupplierInput';
import RoleActions from '../../services/RoleActions';
import SelectMultiple from '../../components/forms/SelectMultiple';

const ProductPage = ({ match, history }) => {

    const { id = "new" } = match.params;
    const defaultSupplier = {id: -1, name: ""};
    const userRoles = RoleActions.getRoles();
    const [editing, setEditing] = useState(false);
    const [product, setProduct] = useState({name: "", description: "", category: "", picture: "", suppliers: "", unit: "", mainSupplierId: 1, userCategories: userRoles});
    const [errors, setErrors] = useState({name: "", description: "", category: "", picture: "", suppliers: "", unit: "", userCategories: ""});
    const [units, setUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([defaultSupplier]);
    const [mainSupplier, setMainSupplier] = useState(0);

    useEffect(() => {
        fetchDatas(id);
    }, []);

    useEffect(() => {
        fetchDatas(id);
    }, [id]);

    useEffect(() => {
        if (suppliers !== null && suppliers !== undefined && suppliers.length > 0) {
            let newSupplierOptions = [...supplierOptions];
            let defaultOption = supplierOptions.findIndex(option => option.id === -1);
            if (defaultOption !== -1) {
                newSupplierOptions[defaultOption] = {id: suppliers[0].id, name: suppliers[0].name};
                setSupplierOptions(newSupplierOptions);
                setMainSupplier(suppliers[0].id);
                setProduct(product => {
                    return {...product, mainSupplierId: suppliers[0].id};
                });
            }
        }
    }, [suppliers, product]);

    const fetchDatas = async id => {
        let backEndCategories = categories.length === 0 ? await fetchCategories() : categories;
        let backEndUnits = units.length === 0 ? await fetchUnits() : units;
        let backEndSuppliers = suppliers.length === 0 ? await fetchSuppliers() : suppliers;
        if (id !== "new") {
            setEditing(true);
            await fetchProduct(id);
        } else {
            setProduct({
                ...product, 
                category: backEndCategories[0].id,
                unit: backEndUnits[0].id,
                suppliers: []
            });
        }
    }

    const fetchProduct = async id => {
        try {
            const backEndProduct = await ProductActions.find(id);
            const backEndSuppliers = backEndProduct.suppliers === null || backEndProduct.suppliers === undefined || backEndProduct.suppliers.length === 0 ? supplierOptions : backEndProduct.suppliers.map(supplier => { return {id: supplier.id, name: supplier.name}});
            const backEndUserCategories = backEndProduct.userCategories === null || backEndProduct.userCategories === undefined ? userRoles : userRoles.filter(role => backEndProduct.userCategories.includes(role.value));
            setProduct({ ...backEndProduct, userCategories: backEndUserCategories, category: backEndProduct.category.id, unit: backEndProduct.unit.id });
            setSupplierOptions(backEndSuppliers);
            if (backEndProduct.mainSupplierId !== null && backEndProduct.mainSupplierId !== undefined)
                setMainSupplier(backEndProduct.mainSupplierId);
        } catch (error) {
            console.log(error);
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

    const fetchSuppliers = async () => {
        let response = [];
        try {
            const data = await SupplierActions.findAll();
            setSuppliers(data);
            if (!product.suppliers) {
                setProduct({...product, suppliers: data});
            }
            response = data;
        } catch(error) {
            console.log(error.response);
            // TODO : Notification flash d'une erreur
            history.replace("/products");
        }
        return response;
    }

    const fetchUnits = async () => {
        let response = [];
        try {
            const data = await UnitActions.findAll();
            setUnits(data);
            if (!product.unit) {
                setProduct({...product, unit: data[0].id});
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

    const handleSupplierAdd = e => {
        e.preventDefault();
        if (supplierOptions.length < suppliers.length) {
            let next = suppliers.findIndex(supplier => supplierOptions.find(selection => selection.id === supplier.id) === undefined);
            setSupplierOptions(supplierOptions => {
                return [...supplierOptions, {id: suppliers[next].id, name: suppliers[next].name}];
            });
        }
    }

    const handleSupplierChange = ({ currentTarget }) => {
        let newSupplierOptions = [...supplierOptions];
        let index = parseInt(currentTarget.name);
        let newSupplier = suppliers.find(supplier => supplier.id === parseInt(currentTarget.value));
        newSupplierOptions[index] = {id: newSupplier.id, name: newSupplier.name};
        setSupplierOptions(newSupplierOptions);
    }

    const handleMainChange = (e, selectedMain) => {
        let newMain = parseInt(selectedMain) !== parseInt(mainSupplier) ? selectedMain : 0;
        setMainSupplier(newMain);
        setProduct(product => {
            return {...product, mainSupplierId: newMain};
        });
    }

    const handleDeleteOption = ({ currentTarget }) => {
        setSupplierOptions(supplierOptions => {
            return supplierOptions.filter(option => option.id !== parseInt(currentTarget.name));
        });
    }

    const handleUsersChange = (userCategories) => {
        setProduct(product => {
            return {...product, userCategories};
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = !editing ? ProductActions.create(product, supplierOptions) : ProductActions.update(id, product, supplierOptions);
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
                <div className="row">
                    <div className="col-md-6">
                        <Select name="category" label="Catégorie" value={ product.category } error={ errors.category } onChange={ handleChange }>
                            { categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
                        </Select>
                    </div>
                    <div className="col-md-6">
                        <Select name="unit" label="Unité" value={ product.unit } error={ errors.unit } onChange={ handleChange }>
                            { units.map(unit => <option key={ unit.id } value={ unit.id }>{ unit.name } ({ unit.shorthand })</option>) }
                        </Select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <SelectMultiple name="userCategories" label="Pour les utilisateurs" value={ product.userCategories } error={ errors.userCategories } onChange={ handleUsersChange } data={ userRoles }/>
                    </div>
                </div>
                <SupplierInput options={ supplierOptions } suppliers={ suppliers } main={ mainSupplier } errors={ errors } handleChange={ handleSupplierChange } handleMainChange={ handleMainChange } handleDeleteOption={ handleDeleteOption }/>
                <div className="form-group mt-4">
                    <button className="btn btn-warning" onClick={ handleSupplierAdd }>Ajouter un fournisseur</button>
                </div>
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