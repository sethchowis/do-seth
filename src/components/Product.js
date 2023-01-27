import {useState,useEffect } from "react";
import "./styles.css";

function Products() {
    const [products, setProducts] = useState([]);

    const fetchData = () => {
      return fetch("/product")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }
  
    useEffect(() => {
      fetchData();
    },[])
  
  return (
    <>
      {products.map((product) => {
        return (
          <div className="card my-card" key={`product-${product.id}`}>
            <header className="card-header">
              <p className="card-header-title">
                {product.product_name} (${product.company})
              </p>
            </header>

            <div className="card-content">
              <div className="content">
                <p>{product.product_name}</p>
                <p>{product.company}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Products;
