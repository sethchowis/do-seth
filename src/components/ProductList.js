import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductRow from "./ProductRow";
import { clearProducts } from "../reducers/viewedReducer";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  const dispatch = useDispatch();
  const viewedProducts = useSelector((state) => state.viewed.value);

  const getProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    //console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const organizedData = [];
    let row = [];
    for (const product of products) {
      row.push(product);
      if (row.length === 3) {
        organizedData.push([...row]);
        row = [];
      }
    }
    if (row.length) {
      organizedData.push([...row]);
    }
    console.log(organizedData);
    setDisplayProducts(organizedData);
  }, [products]);

  const logout = () => {
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <section className="hero is-link">
        <div className="hero-body">
          <p className="title">All the products!</p>
          <p className="subtitle">The cheapest prices on the internet</p>
          <button onClick={logout} className="button is-warning">
            Logout
          </button>
          <button onClick={() => {
              dispatch(clearProducts());
          }} className="button is-warning">
            Clear Viewed List
          </button>
        </div>
      </section>

      <div
        className="container"
        style={{
          padding: "32px 0",
        }}
      >
        {displayProducts.map((row, index) => (
          <ProductRow key={`product-row-${index}`} row={row} />
        ))}

        <hr />
        <hr />
        <hr />

        <section className="section">
          <h1 className="title">Viewed Products</h1>
        </section>

        {viewedProducts.map((product) => {
          return (
            <div key={`viewed-product-${product.id}`} className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src={product.image} />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{product.title}</p>
                  </div>
                </div>
                <div className="content">{product.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
