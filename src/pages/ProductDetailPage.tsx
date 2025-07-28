import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Produto não encontrado
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voltar aos Produtos
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar aos Produtos</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 mb-8">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-gray-700 font-medium">Quantidade:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Adicionar ao Carrinho</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-md border transition-colors ${
                    isWishlisted
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-4">Características do Produto</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Produto original com garantia</li>
                  <li>• Frete grátis para todo o Brasil</li>
                  <li>• Entrega em até 7 dias úteis</li>
                  <li>• Troca gratuita em até 30 dias</li>
                  <li>• Atendimento especializado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-lg shadow-md mt-8 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Avaliações dos Clientes
          </h3>
          
          <div className="space-y-6">
            {[
              {
                name: "Carlos Silva",
                rating: 5,
                date: "15 de Janeiro, 2024",
                comment: "Produto excelente! Chegou rapidinho e exatamente como descrito. Recomendo!"
              },
              {
                name: "Maria Santos",
                rating: 4,
                date: "10 de Janeiro, 2024",
                comment: "Muito bom produto, qualidade excepcional. Apenas a embalagem poderia ser melhor."
              },
              {
                name: "João Oliveira",
                rating: 5,
                date: "8 de Janeiro, 2024",
                comment: "Superou minhas expectativas! Definitivamente vou comprar novamente."
              }
            ].map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{review.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;