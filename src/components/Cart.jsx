import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {getCartItems, changeFormField, fetchOrder,} from "../actions/actionCreators";

export default function Cart() {
  const { cartItems, totalSum, loading, error, success } = useSelector(
    (state) => state.cart
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fetchOrder());
  };

  const handleRemove = (name) => {
    localStorage.removeItem(name);
    dispatch(getCartItems());
  };

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    dispatch(changeFormField(id, value));
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (success)
    return (
      <section className="cart text-center">
        <p>Ваш заказ оформлен</p>
        <Link to="/" className="btn btn-outline-secondary">
          На главную
        </Link>
      </section>
    );

  if (!cartItems || cartItems.length === 0 )
    return (
      <section className="cart text-center">
        <p>Вы еще ничего не выбрали</p>
        <Link to="/catalog" className="btn btn-outline-secondary">
          Выбрать
        </Link>
      </section>
    );

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((o, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link to={o.link}>{o.title}</Link>
                  </td>
                  <td>{o.size}</td>
                  <td>{o.quantity}</td>
                  <td>{`${o.price} руб.`}</td>
                  <td>{`${o.price * o.quantity} руб.`}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        handleRemove(o.name)}}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}

            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              {totalSum && <td>{`${totalSum} руб.`}</td>}
            </tr>
          </tbody>
        </table>
      </section>
      {cartItems &&  (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                  required
                />
                <label
                  className="form-check-label"
                  htmlFor="agreement"
                  onChange={handleChange}
                >
                  Согласен с правилами доставки
                </label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">
                {loading ? "Оформляю.." : "Оформить"}
              </button>
              {error && <p>Произошла ошибка, попробуйте еще раз.</p>}
            </form>
          </div>
        </section>
      )}
    </>
  );
}