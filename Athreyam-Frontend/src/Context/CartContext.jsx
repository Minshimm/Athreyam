import React, { createContext, useState, useContext , useEffect} from "react";
import { addToCartAPI, getCartAPI, clearCartAPI , removeFromCartAPI ,fetchMedicinesByIds, } from '../Services/allApi'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const fetchCartItems = async () => {
    console.log("fetchCartItems function executed.");
    try {
      if (userId) {
        const response = await getCartAPI(userId);
        console.log("API Response for logged-in user:", response.data);
        if (response.status === 200 && response.data.items) {
          const items = response.data.items.map((item) => ({
            _id: item._id,
            medicineImg: item.medicineImg || "default-image.jpg",
            medicineName: item.medicineName || "No Name",
            medicinePrice: item.medicinePrice || 0,
            quantity: item.quantity,
          }));
          console.log("Logged-in cart items:", items);
          setCartItems(items);
        }
      } else {
        console.log("Fetching guest cart items.");
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        if (guestCart.length > 0) {
          const response = await fetchMedicinesByIds(
            guestCart.map((item) => item.medicineId)
          );
          console.log("API Response for guest cart:", response.data);

          if (response.status === 200 && response.data.medicines) {
            const updatedCart = guestCart.map((item) => ({
              ...item,
              ...response.data.medicines.find(
                (med) => med._id === item.medicineId
              ),
            }));
            console.log("Updated guest cart items:", updatedCart);
            setCartItems(updatedCart);
          }
        } else {
          console.log("Guest cart is empty.");
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addToCart = async (medicine) => {
    try {
      if (!userId) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const existingItem = guestCart.find(
          (item) => item.medicineId === medicine.id
        );

        if (existingItem) {
          existingItem.quantity += medicine.quantity || 1;
        } else {
          guestCart.push({
            medicineId: medicine.id,
            medicineName: medicine.name,
            medicinePrice: medicine.price,
            medicineImg: medicine.img,
            quantity: medicine.quantity || 1,
          });
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        fetchCartItems();
        console.log("Guest cart updated:", guestCart);
        return;
      }

      
      await addToCartAPI({ userId, medicineId: medicine.id, quantity :1 });
      await fetchCartItems();
      alert("Medicine added Successfully")
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (medicineId) => {
    try {
      if (!userId) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = guestCart.filter(
          (item) => item.medicineId !== medicineId
        );

        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
       fetchCartItems();
        console.log("Guest cart after removal:", updatedCart);
        return;
      }

      await removeFromCartAPI(userId, medicineId);
    fetchCartItems(); 
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const incrementQuantity = async (id) => {
    try {
      if (!userId) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const item = guestCart.find((item) => item.medicineId === id);

        if (item) {
          item.quantity += 1;
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          fetchCartItems(); 
        }
        return;
      }

      await addToCartAPI({ userId, medicineId: id, quantity: 1 });
      fetchCartItems();
    } catch (err) {
      console.error("Error incrementing quantity:", err);
    }
  };

  const decrementQuantity = async (id) => {
    try {
      if (!userId) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const item = guestCart.find((item) => item.medicineId === id);

        if (item && item.quantity > 1) {
          item.quantity -= 1;
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          fetchCartItems();
        }
        return;
      }

      const item = cartItems.find((item) => item._id === id);
      if (item && item.quantity > 1) {
        await addToCartAPI({ userId, medicineId: id, quantity: -1 });
         fetchCartItems();
      }
    } catch (err) {
      console.error("Error decrementing quantity:", err);
    }
  };

  const clearCart = async () => {
    try {
      if (!userId) {
        localStorage.removeItem("guestCart");
        setCartItems([]);
        return;
      }

      const response = await clearCartAPI(userId);
      if (response.status === 200) {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
    return (
      <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        fetchCartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
    );
  };
  
  export const useCart = () => useContext(CartContext); 