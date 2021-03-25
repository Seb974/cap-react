import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderItem from "../../components/OrderItem";
import CartActions from "../../services/CartActions";

const OrderPage = ({ match, history }) => {
    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    const [order, setOrder] = useState({ id:0, items: [], deliveryDate: new Date(), user: {name: "unknown"}, status: CartActions.getDefaultStatus() });
    const [selection, setSelection] = useState([]);
    const [originalSupplier, setOriginalSupplier] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLastState, setIsLastState] = useState(CartActions.isLastState(CartActions.getDefaultStatus()));

    useEffect(() => {
      if (id !== "new") {
        fetchOrder(id);
        setEditing(true);
      }
    }, [id]);

    useEffect(() => { 
        setIsLastState(CartActions.isLastState(order.status));
    }, [order]);

    const fetchOrder = async (id) => {
        try {
          CartActions.find(id)
                    .then(response => {
                          setOrder({...response, items: response.items.sort((a, b) => (a.product.name > b.product.name) ? 1 : -1)});
                          setOriginalSupplier(response.items.map(item => {
                            return {id: item.id, supplier: item.supplier.id};
                          }))
                    });
        } catch (error) {
            console.log(response.error);
          // TODO : Notification flash d'une erreur
          //history.replace("/orders");
        }
    };

    const handleChange = ({ currentTarget }) => {
        const [name, key] = currentTarget.name.split("-");
        const items = order.items.slice();
        items[key][[name]] = currentTarget.value;
        setOrder({ ...order, items: items });
    };

    const handleSupplierChange = ({ currentTarget }) => {
        let updatedItem = order.items.find(item => item.id === parseInt(currentTarget.name));
        let newItems = [
            ...order.items.filter(item => item.id !== updatedItem.id), 
            {...updatedItem, supplier: currentTarget.value }
        ];
        setOrder(order => {
            return {...order, items: newItems.sort((a, b) => (a.product.name > b.product.name) ? 1 : -1)};
        });
        if (isLastState && originalSupplier.find(item => item.id === updatedItem.id).supplier !== currentTarget.value)
            setSelection([...selection, updatedItem.id]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = !editing ? CartActions.create(order) : 
                        isLastState && selection.length > 0 ? 
                            CartActions.sendToOtherSupplier(id, {...order, items: order.items.filter(item => selection.includes(item.id))}) : 
                            CartActions.update(id, order);
        // request.then((response) => {
        //           setErrors({});
        //           //TODO : Flash notification de succès
        //           history.replace("/orders");
        //       })
        //       .catch(({ response }) => {
        //           const { violations } = response.data;
        //           if (violations) {
        //               const apiErrors = {};
        //               violations.forEach(({ propertyPath, message }) => apiErrors[propertyPath] = message);
        //               setErrors(apiErrors);
        //           }
        //           //TODO : Flash notification d'erreur
        //       });
    };

    const handleCheckItem = ({ currentTarget }) => {
        const index = parseInt(currentTarget.name);
        const newSelection = selection.includes(index) ? selection.filter(item => item !== index) : [...selection, index];
        setSelection(newSelection);
    }

    const formatDate = (stringDate) => {
      let date = new Date(stringDate);
      return (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + 
            ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1) + "/" + 
              date.getFullYear();
    }

    return (
        <>
            <h1>
              { !(editing && order.deliveryDate) ? "Créer une commande" :
                "Commande N°" + order.id.toString().padStart(10, '0') + ' - ' + order.user.name + " pour le " + formatDate(order.deliveryDate)
              }
            </h1>
            { order.deliveryDate && (
                <form onSubmit={ handleSubmit } className="form-group">
                    { order.items.map((item, index) => 
                        <OrderItem
                            key={ item.id }
                            isLastState={ isLastState }
                            item={ item }
                            index={ index }
                            handleChange={ handleChange }
                            handleSupplierChange={ handleSupplierChange }
                            handleCheckItem={ handleCheckItem }
                            originalSupplier={ originalSupplier }
                            selection={ selection }
                        />)
                    }
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-warning" disabled={ isLastState && selection.length === 0 }>
                            { !isLastState ? "Envoyer" : "Renvoyer" }
                        </button>
                    </div>
                    <div className="row">
                        <Link to="/orders" className="btn btn-link">Retour à la liste</Link>
                    </div>
                </form>
            )}
        </>
    );
};

export default OrderPage;