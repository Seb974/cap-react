import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddressPanel from '../../components/AddressPanel';
import ContactPanel from '../../components/ContactPanel';
import AuthContext from '../../contexts/AuthContext';
import UserActions from '../../services/UserActions';

const ProfilePage = (props) => {

    // const initialInformations = { phone: '', address: '', address2: '', zipcode: '', city: '', position: AddressPanel.getInitialPosition()};
    const initialInformations =  AddressPanel.getInitialInformations();
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [informations, setInformations] = useState(initialInformations);
    const [errors, setErrors] = useState({ name: '', email: '', phone: '', address: '', address2: '', zipcode: '', city: '', position: ''});

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

    const onSubmit = e => {
        e.preventDefault();
        UserActions.update(currentUser.id, currentUser, informations)
                   .then(response => {
                       setCurrentUser(response.data);
                        setErrors({});
                        //TODO : Flash notification de succès
                   })
                   .catch( ({ response }) => {
                       let apiErrors = [];
                        const { violations } = response.data;
                        if (violations) {
                            violations.forEach(({propertyPath, message}) => {
                                apiErrors[propertyPath] = message;
                            });
                            setErrors(apiErrors);
                        }
                        //TODO : Flash notification d'erreur
                   });
    };

    return (
        <>
            <div className="row"><h2>Les information du site</h2></div>
            <br/>
            <ContactPanel user={ currentUser } phone={ informations.phone } onUserChange={ onUserInputChange } onPhoneChange={ onPhoneChange } errors={ errors }/>
            <hr/>
            <div className="row"><h4>Adresse</h4></div>
                <AddressPanel informations={ informations } onInformationsChange={ onInformationsChange } onPositionChange={ onUpdatePosition } errors={ errors }/>
            <div className="form-group text-center">
                <button className="btn btn-success mb-2" onClick={ onSubmit }>Mettre à jour</button>
            </div>
            <div className="row mb-5">
                <Link to="/" className="btn btn-link">Retour au catalogue</Link>
            </div>
        </>
    );
}
 
export default ProfilePage;