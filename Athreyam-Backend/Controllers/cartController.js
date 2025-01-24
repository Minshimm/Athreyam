const Cart = require('../Models/cartSchema')
const Medicine = require('../Models/medicineSchema')

exports.addToCart = async (req, res) => {
  const { userId, medicineId, quantity } = req.body;

  try {
    console.log("Received payload:", req.body);

    if (!userId || !medicineId || quantity == null) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, items: [] });
    }

    const existingItem = userCart.items.find(
      (item) => item.medicineId.toString() === medicineId
    );

    if (existingItem) {
      existingItem.quantity += quantity;

      if (existingItem.quantity < 1) {
        return res.status(400).json({ error: "Quantity cannot be less than 1" });
      }
    } else if (quantity > 0) {
      userCart.items.push({ medicineId, quantity });
    } else {
      return res.status(400).json({ error: "Invalid decrement operation" });
    }

    await userCart.save();
    res.status(200).json({ message: "Cart updated successfully!", cart: userCart });
  } catch (err) {
    console.error("Error adding to cart:", err.message);
    res.status(500).json({ error: "Failed to update cart" });
  }
  };

  exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
      // Find the cart and populate `medicineId` with its fields
      const cart = await Cart.findOne({ userId }).populate({
        path: 'items.medicineId',
        model: 'medicines', // Ensure this matches your Medicine schema
        select: 'medicineName medicinePrice medicineImg', // Fetch only required fields
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Filter out invalid cart items where `medicineId` is null
      const validItems = cart.items.filter((item) => item.medicineId !== null);
  
      if (validItems.length !== cart.items.length) {
        // If there are invalid items, update the cart in the database
        cart.items = validItems;
        await cart.save();
      }
  
      // Transform the cart items for the frontend
      const transformedItems = validItems.map((item) => ({
        _id: item.medicineId._id,
        medicineName: item.medicineId.medicineName || "No Name",
        medicinePrice: item.medicineId.medicinePrice || 0,
        medicineImg: item.medicineId.medicineImg
          ? `http://localhost:3000/uploads/${item.medicineId.medicineImg}`
          : "default-image.jpg",
        quantity: item.quantity,
      }));
  
      res.status(200).json({ items: transformedItems });
    } catch (err) {
      console.error('Error fetching cart:', err.message);
      res.status(500).json({ error: 'Failed to fetch cart', details: err.message });
    }
  };

  exports.clearCart = async (req, res) => {
    const { userId } = req.params;

    try {
      console.log('Clearing cart for userId:', userId);
  
      if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
      }
  
      const deletedCart = await Cart.findOneAndDelete({ userId });
      if (!deletedCart) {
        return res.status(404).json({ message: 'Cart not found for the user' });
      }
  
      res.status(200).json({ message: 'Cart cleared successfully!' });
    } catch (err) {
      console.error('Error clearing cart:', err.message);
      res.status(500).json({ error: 'Failed to clear cart' });
    }
  };
  //remove speific item from cart
  exports.removeFromCart = async (req, res) => {
    const { userId, medicineId } = req.body;

  try {
    if (!userId || !medicineId) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the specific item
    userCart.items = userCart.items.filter(
      (item) => item.medicineId.toString() !== medicineId
    );

    await userCart.save();
    res.status(200).json({ message: 'Item removed successfully', cart: userCart });
  } catch (err) {
    console.error('Error removing item:', err.message);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

exports.mergeCart = async (req, res) => {
  const { userId, guestCart } = req.body;

  try {
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, items: [] });
    }

    // Merge guest cart into user cart
    for (const guestItem of guestCart) {
      const existingItem = userCart.items.find(
        (item) => item.medicineId.toString() === guestItem.medicineId
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        userCart.items.push(guestItem);
      }
    }

    await userCart.save();

    // Populate medicine details before sending response
    const populatedCart = await Cart.findOne({ userId }).populate({
      path: 'items.medicineId',
      model: 'medicines', // Ensure this matches the registered model name
      select: 'medicineName medicinePrice medicineImg',
    });

    const transformedItems = populatedCart.items.map((item) => ({
      _id: item.medicineId._id,
      medicineName: item.medicineId.medicineName || 'No Name',
      medicinePrice: item.medicineId.medicinePrice || 0,
      medicineImg: item.medicineId.medicineImg
        ? `http://localhost:3000/uploads/${item.medicineId.medicineImg}`
        : 'default-image.jpg',
      quantity: item.quantity,
    }));

    res.status(200).json({ message: 'Cart merged successfully', items: transformedItems });
  } catch (err) {
    console.error('Error merging cart:', err.message);
    res.status(500).json({ error: 'Failed to merge cart' });
  }
};