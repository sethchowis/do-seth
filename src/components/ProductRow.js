import { useNavigate } from "react-router-dom";

const ProductRow = ({ row }) => {
  const navigate = useNavigate();
  return (
    <div className="columns">
      {row.map((product) => {
        return (
          <div
            key={`product-${product.id}`}
            className="column is-one-third"
            onClick={() => {
              navigate(`/products/${product.id}`, {
                  state: product
              });
            }}
          >
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
          </div>
        );
      })}
    </div>
  );
};

export default ProductRow;
