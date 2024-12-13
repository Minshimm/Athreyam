import React, { createContext, useState, useContext , useEffect} from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart items from sessionStorage if available
        const storedCart = sessionStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : [];
      });
    
      // Update sessionStorage whenever cartItems change
      useEffect(() => {
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);
    

    const addToCart = (medicine) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === medicine.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === medicine.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...medicine, quantity: 1 }];
      });
    };
  
    const removeFromCart = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
  
    const incrementQuantity = (id) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };
  
    const decrementQuantity = (id) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    };
  
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          incrementQuantity,
          decrementQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => useContext(CartContext);