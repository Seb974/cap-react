import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Field from "../../components/forms/Field";
import CartActions from "../../services/CartActions";

const OrderPage = ({ match, history }) => {
  const { id = "new" } = match.params;
  const [editing, setEditing] = useState(false);
  const [order, setOrder] = useState([]);
  const [tempOrd, setTempOrd] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (id !== "new") {
      fetchOrder(id);
      setEditing(true);
    }
  }, [id]);

  const fetchOrder = async (id) => {
    try {
      return setOrder(await CartActions.find(id));
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
    setOrder({ ...order, [items]: items });

    //setOrder({ ...order.product, [currentTarget.name]: currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = !editing
      ? CartActions.create(order)
      : CartActions.update(id, order);
    request
      .then((response) => {
        setErrors({});
        //TODO : Flash notification de succès
        //history.replace("/orders");
      })
      .catch(({ response }) => {
        const { violations } = response.data;
        if (violations) {
          const apiErrors = {};
          violations.forEach(({ propertyPath, message }) => {
            apiErrors[propertyPath] = message;
          });
          setErrors(apiErrors);
        }
        //TODO : Flash notification d'erreur
      });
  };
  console.log(order);
  return (
    <>
      <h1>
        {editing && order.deliveryDate
          ? "Commande  '" + order.deliveryDate + "' par " + order.user.name
          : "Créer une commande"}
      </h1>
      {order.deliveryDate && (
        <form onSubmit={handleSubmit} className="form-group">
          {order.items.map((item, index) => {
            return (
              <div className="row" key={index}>
                <Field
                  boots="col-6 p-3"
                  name={"name-" + index}
                  value={item.product.name}
                  onChange={handleChange}
                  label="Nom du produit"
                  placeholder=""
                  disabled="disabled"
                />
                <Field
                  boots="col-1 p-3"
                  name={"stock-" + index}
                  value={item.stock}
                  onChange={handleChange}
                  label="Stock"
                  placeholder=""
                  type="number"
                  disabled="disabled"
                />
                <Field
                  boots="col-1 p-3"
                  name={"quantity-" + index}
                  value={item.quantity}
                  onChange={handleChange}
                  label="Quantité"
                  placeholder=""
                  type="number"
                  disabled=""
                />
              </div>
            );
          })}
          <div className="form-group text-center">
            <button type="submit" className="btn btn-warning">
              Mettre à jour
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default OrderPage;
