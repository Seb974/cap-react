import React from 'react';
import Field from "./forms/Field";
import Select from "./forms/Select";

const OrderItem = ({isLastState, item, index, handleChange, handleSupplierChange, handleCheckItem, originalSupplier, selection }) => {
    return (
        <div className="row" key={index}>
            <Field
                boots={ isLastState ? "col-4 p-3" : "col-6 p-3" }
                name={ "name-" + index }
                value={ item.product.name }
                onChange={ handleChange }
                label="Nom du produit"
                placeholder=""
                disabled="disabled"
            />
            <Field
                boots="col-2 p-3"
                name={ "stock-" + index }
                value={ item.stock }
                onChange={ handleChange }
                label="Stock"
                placeholder=""
                type="number"
                disabled="disabled"
            />
            <Field
                boots="col-2 p-3"
                name={ "quantity-" + index }
                value={ item.quantity }
                onChange={ handleChange }
                label="Quantité"
                placeholder=""
                type="number"
                disabled=""
            />
            <div className="col-2 p-3">
                <Select name={ item.id } label="Fournisseur" value={ item.supplier.id } onChange={ handleSupplierChange }>   {/*  error={ errors.supplier } */}
                    { item.product.suppliers.map(supplier => <option key={ supplier.id } value={ supplier.id }>{ supplier.name }</option>)}
                </Select>
            </div>
            { !isLastState ? <></> :
                <div className="supplier-main-options col-md-2">
                    <label>
                        <input 
                            name={ item.id }
                            type="checkbox" 
                            checked={ selection.includes(item.id) } 
                            onChange={ handleCheckItem }
                            disabled={ item.product.suppliers.length <= 1 || 
                                        (originalSupplier.find(obj => obj.id === item.id) === undefined || 
                                        (typeof item.supplier === 'object' && item.supplier !== null ? item.supplier.id : parseInt(item.supplier)) === originalSupplier.find(obj => obj.id === item.id).supplier) }
                        />
                        <span className="ml-3 flex">Sélectionner</span>
                    </label>
                </div>
            }
        </div>
    );
}
 
export default OrderItem;