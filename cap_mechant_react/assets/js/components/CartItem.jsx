import React, { useState, useContext } from 'react';
import CartContext from '../contexts/CartContext';
import ProductsContext from '../contexts/ProductsContext';
import CartActions from '../services/CartActions';
import Field from './forms/Field';

const CartItem = ({ item }) => {

    const { cart, setCart } = useContext(CartContext);
    const { products } = useContext(ProductsContext);

    const onQuantityChange = ({currentTarget}) => {
        const filteredCart = cart.filter(cartItem => cartItem.product.id !== item.product.id);
        setCart([...filteredCart, {...item, [currentTarget.name]: currentTarget.value}].sort((a, b) => (a.product.id > b.product.id) ? 1 : -1));
    };

    const handleDelete = e => {
        setCart(CartActions.remove(item.product, item.quantity, products));
    }

    return (
        <>
            <tr>
                <td className="centered-cell">{ item.product.name }</td>
                <td>
                    <Field
                        name="stock"
                        type="number"
                        label=" "
                        value={ item.stock }
                        onChange={ onQuantityChange }
                        placeholder=" "
                        error=""
                        required={ true }
                    />
                </td>
                <td>
                    <Field 
                        name="quantity"
                        type="number"
                        label=" "
                        value={ item.quantity }
                        onChange={ onQuantityChange }
                        placeholder=" "
                        error=""
                        required={ true }
                    />
                </td>
                <td className="centered-cell">
                    <button className="btn btn-sm btn-danger" onClick={ handleDelete }>Supprimer</button>
                </td>
            </tr>
        </>
    );
}
 
export default CartItem;