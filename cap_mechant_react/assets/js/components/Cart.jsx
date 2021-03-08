import 'flatpickr/dist/themes/material_green.css'
import { French } from "flatpickr/dist/l10n/fr.js"
import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import CartItem from './CartItem';

const today = new Date();
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0, 0);

const Cart = ({ cart, date, onDateChange, onSubmit}) => {

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h2>Récapitulatif de la commande</h2>
            </div>
            <div className="row mb-4">
                <div className="col-md-6 row-date">
                    <label htmlFor="date" className="date-label">Date de livraison</label>
                    <Flatpickr
                        name="date"
                        value={ date }
                        onChange={ onDateChange }
                        className="form-control"
                        options={{
                            dateFormat: "d/m/Y",
                            minDate: today.getDay() !== 0 ? today : tomorrow,
                            locale: French,
                            disable: [(date) => date.getDay() === 0],
                        }}
                    />
                </div>
            </div>
            <form onSubmit={ onSubmit }>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Stock</th>
                            <th>Qté</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        { cart.length === 0 ? 
                            <tr><td colSpan="3">Panier vide.</td></tr> : 
                            cart.map(item => <CartItem key={ item.product.id } item={ item } />) 
                        }
                        
                    </tbody>
                </table>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success">Commander</button>
                </div>
            </form>
        </>
    );
}

Cart.getToday = () => {
    return today;
}

Cart.getTomorrow = () => {
    return tomorrow;
}
 
export default Cart;