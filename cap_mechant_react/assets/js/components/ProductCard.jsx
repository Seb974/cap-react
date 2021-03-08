import React, { useState, useContext } from 'react';
import Field from './forms/Field';
import CartContext from '../contexts/CartContext';
import ProductsContext from '../contexts/ProductsContext';
import CartActions from '../services/CartActions';

const ProductCard = (props) => {

    const { setCart } = useContext(CartContext);
    const { products } = useContext(ProductsContext);
    const [quantity, setQuantity] = useState("");
    const [errors, setErrors] = useState({quantity: ""});

    const handleChange = ({ currentTarget }) => {
        setQuantity(currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (quantity.length > 0) {
            setCart(CartActions.add(props.details, quantity, products));
            setQuantity("");
        }
    }

    return (
        <div className="col-lg-4">
            <div className="card mb-5 ">
                <h4 className="card-header">{ props.details.name }</h4>
                {/* <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                </div> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none card-picture" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style={{fontSize: 1.125 + 'rem', textAnchor: 'middle'}}>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg> */}
                {/* <div className="card-body card-product-name"> */}
                    {/* <h4>{ props.details.name }</h4> */}
                    {/* <p className="card-text">{ props.details.description }</p> */}
                {/* </div> */}
                {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item"><i className="fas fa-utensils mr-2"></i> { props.details.category.name }</li> */}
                    {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                {/* </ul>
                <hr className="ml-5 mr-5"/> */}
                <div className="card-body action-panel">
                    <form onSubmit={ handleSubmit } className="product-form">
                        <Field 
                            className="card-field mr-10"
                            name="name"
                            type="number"
                            label="Commander"
                            value={ quantity }
                            onChange={ handleChange }
                            placeholder=" "
                            error={ errors.quantity }
                        />
                        <button type="submit" className="btn btn-success ml-auto card-button" disabled={quantity.length === 0}><i className="fas fa-cart-plus mr-2"></i>Ajouter</button>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    <i className="fas fa-utensils mr-2"></i> { props.details.category.name }
                </div>
            </div>
        </div>
    );
}
 
export default ProductCard;