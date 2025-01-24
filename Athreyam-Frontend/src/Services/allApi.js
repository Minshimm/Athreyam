import { serverUrl } from './serverUrl';
import { commonAPI } from './commonApi';
export const registerAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverUrl}/api/register`,reqBody,"")
}
export const loginAPI = async(reqBody)=>{
    return await commonAPI('POST',`${serverUrl}/api/login`,reqBody,"")
}
export const updateUserAPI = async (userId, reqBody) => {
  return await commonAPI('PUT', `${serverUrl}/api/user/update/${userId}`, reqBody, '');
};
export const getAllUsersAPI = async () => {
  return await commonAPI('GET', `${serverUrl}/api/users`, '', '');
};
export const addMedicineAPI = async(reqBody)=>{
    return await commonAPI('POST', `${serverUrl}/api/addMedicine`, reqBody,"");
};

// Get All Medicines
export const getAllMedicinesAPI = async (searchKey) => {
    return await commonAPI('GET', `${serverUrl}/api/getAllMedicines?search=${searchKey}`,"","");
};

// Edit Medicine
export const editMedicineAPI = async (id, reqBody) => {
    return await commonAPI('PUT', `${serverUrl}/api/updateMedicine/${id}`, reqBody,"");
};

// Delete Medicine
export const deleteMedicineAPI = async (id) => {
    return await commonAPI('DELETE', `${serverUrl}/api/deleteMedicine/${id}`);
};

// Update stock after order
export const updateStockAfterOrderAPI = async (cartItems) => {
    return await commonAPI("POST", `${serverUrl}/api/updateStockAfterOrder`, { cartItems }, "");
  };

  // Razorpay APIs
  export const createRazorpayOrderAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverUrl}/api/createOrder`, reqBody, '');
  };
  
  export const verifyRazorpayPaymentAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverUrl}/api/verifyPayment`, reqBody, '');
  };

  // Add to Cart
export const addToCartAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverUrl}/api/cart/add`, reqBody, '');
  };
  
  // Get Cart Items
  export const getCartAPI = async (userId) => {
    return await commonAPI('GET', `${serverUrl}/api/cart/${userId}`, '', '');
  };
  
  // Clear Cart
  export const clearCartAPI = async (userId) => {
    return await commonAPI('DELETE', `${serverUrl}/api/cart/${userId}`);
  };
  // remove item from cart
  export const removeFromCartAPI = async (userId, medicineId) => {
    const reqBody = { userId, medicineId };
    console.log("Request Body:", reqBody); 
    return await commonAPI('POST', `${serverUrl}/api/cart/remove`, reqBody, '');
  };
  export const mergeCartAPI = async (userId, guestCart) => {
    const reqBody = { userId, guestCart };
    return await commonAPI('POST', `${serverUrl}/api/cart/merge`, reqBody, '');
  };

// Fetch Medicines by IDs for Guest Cart
  export const fetchMedicinesByIds = async (ids) => {
    console.log("fetchMedicinesByIds called with IDs:", ids);
    try {
      const response = await commonAPI("POST", `${serverUrl}/api/medicines/by-ids`, { ids });
      console.log("fetchMedicinesByIds API response:", response.data);
      return response;
    } catch (error) {
      console.error("Error in fetchMedicinesByIds:", error);
      throw error;
    }
  };

  // Fetch all sold medicines
export const getAllSoldMedicinesAPI = async () => {
  try {
      return await commonAPI('GET', `${serverUrl}/api/sold-medicines`, '', '');
  } catch (error) {
      console.error('Error fetching sold medicines:', error);
      throw error;
  }
};

// Add a sold medicine entry
export const addSoldMedicineAPI = async (reqBody) => {
  try {
      return await commonAPI('POST', `${serverUrl}/api/sold-medicines`, reqBody, '');
  } catch (error) {
      console.error('Error adding sold medicine:', error);
      throw error;
  }
};

// Fetch sales by date range
export const getSalesByDateAPI = async (startDate, endDate) => {
  try {
      return await commonAPI(
          'GET',
          `${serverUrl}/api/sold-medicines/date-range?startDate=${startDate}&endDate=${endDate}`,
          '',
          ''
      );
  } catch (error) {
      console.error('Error fetching sales by date range:', error);
      throw error;
  }
};

// Get all rooms
export const getAllRoomsAPI = async () => {
  return await commonAPI("GET", `${serverUrl}/api/rooms`, "", "");
};

// Add a new room
export const addRoomAPI = async (roomData) => {
  return await commonAPI("POST", `${serverUrl}/api/rooms`, roomData, "application/json");
};

// Delete a room
export const deleteRoomAPI = async (roomId) => {
  return await commonAPI("DELETE", `${serverUrl}/api/rooms/${roomId}`, "","application/json");
};

// Update a room (if editing is needed in the future)
export const updateRoomAPI = async (roomId, updatedData) => {
  return await commonAPI("PUT", `${serverUrl}/api/rooms/${roomId}`, updatedData, "application/json");
};
export const addBookingAPI = async (bookingData) => {
  return await commonAPI('POST', `${serverUrl}/api/bookings`, bookingData, '');
};
export const getAllBookingsAPI = async () => {
  return await commonAPI('GET', `${serverUrl}/api/bookings`, '', '');
};
  