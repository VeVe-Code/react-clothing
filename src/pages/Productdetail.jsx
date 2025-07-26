import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CartContext } from '../contexts/Cartcontext';

function Productdetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { products, setProducts } = useContext(CartContext);
  const navigate = useNavigate();

  const addtocart = (e) => {
  e.preventDefault();

  const newProduct = { ...product, quantity };
  const safeProducts = products || [];

  const existingProductIndex = safeProducts.findIndex(p => p.id === product.id);

  let updatedProducts;

  if (existingProductIndex !== -1) {
    updatedProducts = [...safeProducts];
    updatedProducts[existingProductIndex] = {
      ...updatedProducts[existingProductIndex],
      quantity: updatedProducts[existingProductIndex].quantity + quantity
    };
  } else {
    updatedProducts = [...safeProducts, newProduct];
  }

  setProducts(updatedProducts);
  localStorage.setItem("products", JSON.stringify(updatedProducts));
  navigate("/cart");
};


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => {
        console.error("Error fetching product:", err);
        navigate("/404");
      });
  }, [id, navigate]);

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6">
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.title}
          className="w-64 h-64 object-contain mb-4 md:mb-0 md:mr-6"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-blue-800 mb-4">
            Category: {product.category}
          </p>
          <p className="text-2xl font-bold text-green-600 mb-4">
            ${product.price}
          </p>

          <div className="flex items-center mb-4">
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 m-2"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <h1 className="text-xl">{quantity}</h1>
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 m-2"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addtocart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productdetail;

