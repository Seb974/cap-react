import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../contexts/CartContext';
import CartActions from '../../services/CartActions';
import AuthContext from '../../contexts/AuthContext';
import Cart from '../../components/Cart';
import AddressPanel from '../../components/AddressPanel';
import ContactPanel from '../../components/ContactPanel';
import { Link } from 'react-router-dom';

const CartPage = ({ history }) => {

    const today = Cart.getToday();
    const tomorrow = Cart.getTomorrow();
    const initialInformations =  AddressPanel.getInitialInformations();
    const { cart, setCart } = useContext(CartContext);
    const { currentUser, setCurrentUser} = useContext(AuthContext);
    const [date, setDate] = useState(today.getDay() !== 0 ? today : tomorrow);
    const [informations, setInformations] = useState(initialInformations);
    const [active, setActive] = useState("cart");
    const [errors, setErrors] = useState({ name: '', code: '', email: '', phone: '', address: '', address2: '', zipcode: '', city: '', position: ''});

    useEffect(() => {
        if (currentUser.metas !== null && currentUser.metas !== undefined)
            setInformations(informations => {
                return {...currentUser.metas, position: currentUser.metas.position !== null && currentUser.metas.position !== undefined && currentUser.metas.position.length > 0 ? currentUser.metas.position : informations.position}
            });
    }, [currentUser.metas]);

    const onInformationsChange = (newInformations) => {
        setInformations(newInformations);
    };

    const onUpdatePosition = (newInformations) => {
        setInformations(informations => { 
            return {...newInformations, address2: informations.address2, phone: informations.phone};
        });
    };

    const onPhoneChange = (phone) => {
        setInformations(informations => { 
            return {...informations, phone}
        });
    };

    const onUserInputChange = (newCurrentUser) => {
        setCurrentUser(newCurrentUser);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const numericCart = cart.map(item => { 
            return {...item, quantity: parseFloat(item.quantity), stock: parseFloat(item.stock)};
        });
        CartActions.send(numericCart, currentUser, date)
                   .then(response => {
                       setCart(CartActions.removeAll());
                       history.push('/');
                    });
    };

    const onDateChange = date => {
        const newSelection = new Date(date[0].getFullYear(), date[0].getMonth(), date[0].getDate(), 9, 0, 0);
        setDate(newSelection);
    };

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#cart">1. Commande</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#contact">2. Coordonnées</a>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content mt-4">
                <div className="tab-pane fade active show" id="cart">
                    <Cart cart={ cart } date={ date } onDateChange={ onDateChange } onSubmit={ handleSubmit }/>
                </div>
                <div className="tab-pane fade" id="contact">
                    <>
                        <div className="row"><h2>Coordonnées pour la livraison</h2></div>
                        <br/>
                        <ContactPanel user={ currentUser } phone={ informations.phone } onUserChange={ onUserInputChange } onPhoneChange={ onPhoneChange } errors={ errors }/>
                        <hr/>
                        <div className="row"><h4>Adresse</h4></div>
                            <AddressPanel informations={ informations } onInformationsChange={ onInformationsChange } onPositionChange={ onUpdatePosition } active={ active } errors={ errors }/>
                        <div className="form-group text-center">
                            <button className="btn btn-success mb-2" onClick={ handleSubmit }>Commander</button>
                        </div>
                    </>
                </div>
            </div>
        </>
    );
}
 
export default CartPage;