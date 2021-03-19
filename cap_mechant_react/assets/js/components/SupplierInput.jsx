import React from 'react';
import Select from './forms/Select';

const SupplierInput = ({ options, suppliers, main, errors, handleChange, handleMainChange, handleDeleteOption }) => {

    const onChange = (e, selectedId) => {
        handleMainChange(e, selectedId);
    }

    const onDeleteOption = e => {
        e.preventDefault();
        handleDeleteOption(e);
    }

    return (
        <>
            { options.map((supplierOption, index) => {
                return (
                    <div className="row" key={ index }>
                        <div className="col-md-8">
                            <Select name={ index } label={"Fournisseur " + (index + 1) } value={ supplierOption.id } error={ errors.suppliers } onChange={ handleChange }>
                                { suppliers.filter(supplier => options.find(option => supplier.id === option.id) === undefined || supplier.id === supplierOption.id )
                                           .map(supplier => <option key={ supplier.id } value={ supplier.id }>{ supplier.name }</option>)}
                            </Select>
                        </div>
                        <div className="supplier-main-options col-md-2">
                            <label>
                                <input name={ supplierOption.id } type="checkbox" checked={ parseInt(supplierOption.id) === parseInt(main) } onChange={ (e) => onChange(e, supplierOption.id) }/>
                                <span className="ml-3 flex">Principal</span>
                            </label>
                        </div>
                        { options.length <= 1 ? <></> : 
                            <div className="supplier-main-options col-md-2 mb-2">
                                <a href="#" name={ supplierOption.id } onClick={ onDeleteOption }>
                                    <span className="mr-3"><i className="fas fa-trash-alt"></i></span>
                                    Supprimer
                                </a>
                            </div>
                        }
                    </div>
                )})
            }
        </>
    );
}
 
export default SupplierInput;