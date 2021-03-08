import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserActions from '../../services/UserActions';
import ContactPanel from '../../components/ContactPanel';
import AddressPanel from '../../components/AddressPanel';

const UserPage = ({ history, match }) => {

    const { id = "new" } = match.params;
    const initialInformations =  AddressPanel.getInitialInformations();
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({name:"", email: "", password: "", confirmPassword: ""});
    const [informations, setInformations] = useState(initialInformations);
    const [errors, setErrors] = useState({name:"", email: "", password: "", confirmPassword: "", phone: "", address: "", address2: "", zipcode: "", city: "", position: ""});

    useEffect(() => {
        fetchUser(id);
    }, []);

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    const fetchUser = async id => {
        if (id !== undefined && id !== "new") {
            setEditing(true);
            try {
                const newUser = await UserActions.find(id);
                setUser(newUser);
                if (newUser.metas !== null && newUser.metas !== undefined)
                    setInformations( informations => {
                        return {...newUser.metas, position: newUser.metas.position !== null && newUser.metas.position !== undefined && newUser.metas.position.length > 0 ? newUser.metas.position : informations.position};
                    }
                    );
            } catch (error) {
                console.log(error.response);
                // TODO : Notification flash d'une erreur
                history.replace("/users");
            }
        }
    };

    const onInformationsChange = (newInformations) => {
        setInformations(newInformations);
    };

    const onUpdatePosition = (newInformations) => {
        setInformations(informations => { 
            return {...newInformations, address2: informations.address2, phone: informations.phone};
        });
    };

    const onUserInputChange = (newUser) => {
        setUser(newUser);
    };

    const onPhoneChange = (phone) => {
        setInformations(informations => { 
            return {...informations, phone}
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiErrors = {};
        let request = null;
        const { name, email, password, confirmPassword, metas } = user;

        if (!editing) {
            if (password !== confirmPassword) {
                apiErrors.confirmPassword = "Les mots de passe saisis ne correspondent pas";
                setErrors(apiErrors);
                return ;
            }
            request = UserActions.create({name, email, password, metas: {...informations}});
        } else {
            const metadatas = metas === null || metas === undefined ? {...informations} : {id: metas.id, ...informations};
            request = UserActions.update(id, {name, email, metas: metas}, metadatas);
        }
        request.then(response => {
                    setErrors({});
                    //TODO : Flash notification de succès
                    history.replace("/users");
                })
               .catch( ({ response }) => {
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
            <div className="row"><h2>{!editing ? "Créer un utilisateur" : "Modifier l'utilisateur '" + user.name + "'"}</h2></div>
            <form onSubmit={ handleSubmit }>
                <ContactPanel user={ user } phone={ informations.phone } onUserChange={ onUserInputChange } onPhoneChange={ onPhoneChange } errors={ errors } editing={ editing }/>
                <hr/>
                <div className="row"><h4>Adresse</h4></div>
                <AddressPanel informations={ informations } onInformationsChange={ onInformationsChange } onPositionChange={ onUpdatePosition } errors={ errors }/>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-success mb-2">Enregistrer</button>
                </div>
            </form>
            <div className="row mb-5">
                <Link to="/users" className="btn btn-link">Retour à la liste</Link>
            </div>
        </>
    );
}
 
export default UserPage;