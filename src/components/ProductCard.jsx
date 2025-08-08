import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    const [inStock, setInStock] = useState(false);

    useEffect(() => {
        const productHasStock = product.id % 2 === 0;
        setInStock(productHasStock);
    }, [product]);

    return (
        <div id={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <div className="card text-center h-100">
                <img
                    style={{
                        objectFit: "contain",
                    }}
                    className="card-img-top p-3"
                    src={product.image}
                    alt="Card"
                    height={300}
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                        {product.description.substring(0, 90)}...
                    </p>
                </div>
                <Variants
                    availableSizes={["S", "M", "L"]}
                    availableColors={["Black", "Gray"]}
                />
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                    {inStock ? (
                        <>
                            <Link
                                to={"/product/" + product.id}
                                className="btn btn-dark m-1"
                            >
                                Buy Now
                            </Link>
                            <button
                                className="btn btn-dark m-1"
                                onClick={() => {
                                    toast.success("Added to cart");
                                    addProduct(product);
                                }}
                            >
                                Add to Cart
                            </button>
                        </>
                    ) : (
                        <button className="btn m-1 btn-secondary" disabled>
                            Out of Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

const Variants = ({ availableSizes, availableColors }) => {
  const [size, setSize] = useState(availableSizes ? availableSizes[0] : "");
  const [color, setColor] = useState(availableColors ? availableColors[0] : "");

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

return (
    <div className="text-left ml-2">
      <div className="row align-items-center mb-2">
        <div className="col-3">
          <label htmlFor="size-variant" className="font-weight-bold">
            Size:
          </label>
        </div>
        <div className="col-9">
          <div className="form-group mb-0">
            <select
              name="Size Variant"
              id="size-variant"
              className="form-control"
              value={size}
              onChange={handleSizeChange}
            >
              {availableSizes &&
                availableSizes.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row align-items-center mb-2">
        <div className="col-3">
          <label htmlFor="color-variant" className="font-weight-bold">
            Color:
          </label>
        </div>
        <div className="col-9">
          <div className="form-group mb-0">
            <select
              name="Color Variant"
              id="color-variant"
              className="form-control"
              value={color}
              onChange={handleColorChange}
            >
              {availableColors &&
                availableColors.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};