import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemRequest, setQuantity, setSize } from "../actions/actionCreators";
import Preloader from "./Preloader";

export default function CatalogItem({ match, history }) {
  const { item, availableSizes, loading, quantity, size } = useSelector(
    (state) => state.catalogItem
  );
  const dispatch = useDispatch();
  const id = match.params.id.replace(".html", "");

  useEffect(() => {
    dispatch(fetchItemRequest(id));
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 0) dispatch(setQuantity(quantity - 1));
  };

  const handleIncrease = () => {
    if (quantity < 10) dispatch(setQuantity(quantity + 1));
  };

  const handlePickSize = (size) => {
    dispatch(setSize(size));
  };

  const handleToCart = () => {
    if (localStorage[`cartItem${id}_${size}`]) {
      const updatedItem = JSON.parse(localStorage[`cartItem${id}_${size}`]);
      updatedItem.quantity += 1;
      localStorage[`cartItem${id}_${size}`] = JSON.stringify(updatedItem);
    } else {
      localStorage[`cartItem${id}_${size}`] = JSON.stringify({
        name: `cartItem${id}_${size}`,
        id: Number(id),
        link: match.url,
        title: item.title,
        price: item.price,
        quantity: quantity,
        size: size,
      });
    }

    history.push("/cart");
  };

  if (loading) return <Preloader />;


  return (
    <>
      {item && (
        <section className="catalog-item">
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img
                src={item.images[0]}
                className="img-fluid"
                alt={item.title}
              />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                  </tr>
                </tbody>
              </table>
              {availableSizes && (
                <>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:
                      {availableSizes.map((item) => (
                        <span
                          key={item.size}
                          className={`catalog-item-size ${
                            size === item.size ? "selected" : ""
                          }`}
                          onClick={() => handlePickSize(item.size)}
                        >
                          {item.size}
                        </span>
                      ))}
                    </p>
                    <p>
                      Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          onClick={handleDecrease}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">
                          {quantity}
                        </span>
                        <button
                          className="btn btn-secondary"
                          onClick={handleIncrease}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  </div>
                  <button
                    className="btn btn-danger btn-block btn-lg"
                    disabled={size ? false : "disabled"}
                    onClick={handleToCart}
                  >
                    В корзину
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}