import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addProduct } from "../reducers/viewedReducer";

const ProductDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const viewedProducts = useSelector(state => state.viewed.value);

  const [product, setProduct] = useState(state);

  const getProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setProduct(data);
    dispatch(addProduct(data));
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return null;
  return (
    <>
      <div className="card">
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
    </>
  );
};

export default ProductDetails;
