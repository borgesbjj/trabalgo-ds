import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Pro Max',
    description: 'Smartphone premium com tela OLED de 6.7", câmera tripla de 48MP, processador A15 Bionic e bateria de longa duração.',
    price: 1299.99,
    category: 'Eletrônicos',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: '2',
    name: 'Laptop Gaming Ultra',
    description: 'Laptop gamer com processador Intel i7, RTX 4070, 32GB RAM, SSD 1TB. Perfeito para gaming e produtividade.',
    price: 2499.99,
    category: 'Eletrônicos',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: '3',
    name: 'Tênis Esportivo Premium',
    description: 'Tênis para corrida com tecnologia de amortecimento avançado, material respirável e design moderno.',
    price: 249.99,
    category: 'Esportes',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: '4',
    name: 'Camiseta Casual Moderna',
    description: 'Camiseta de algodão premium, corte moderno, disponível em várias cores. Confortável e estilosa.',
    price: 39.99,
    category: 'Roupas',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.4,
    reviews: 67,
    inStock: true
  },
  {
    id: '5',
    name: 'Fones de Ouvido Bluetooth',
    description: 'Fones wireless com cancelamento de ruído ativo, bateria de 30h, qualidade de som premium.',
    price: 199.99,
    category: 'Eletrônicos',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.9,
    reviews: 312,
    inStock: true
  },
  {
    id: '6',
    name: 'Relógio Inteligente',
    description: 'Smartwatch com monitoramento de saúde, GPS, resistente à água, tela AMOLED e bateria de 7 dias.',
    price: 349.99,
    category: 'Eletrônicos',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.5,
    reviews: 198,
    inStock: true
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};