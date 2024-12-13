import React, { useState } from 'react'

function CardPayment({ onPay }) {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        cardType: "",
        expiryDate: "",
        cvv: "",
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));
      };
  return (
    <div>
        <div className='text-dark pb-5 bg-white'>
      <h4 className='fw-bold text-center text-uppercase pt-5' style={{letterSpacing: "5px", color: "#53633f"}}>Enter Card Details</h4>
      <form className='px-5'>
        
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="Enter Card Number"
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        
          <label>Card Type:</label>
          <select
            name="cardType"
            value={cardDetails.cardType}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          >
            <option value="">-- Select Card Type --</option>
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="amex">American Express</option>
          </select>
      
       
          <label>Expiry Date:</label>
          <input
            type="month"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
       
          <label>CVV:</label>
          <input
            type="password"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            placeholder="Enter CVV"
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
      <div className='text-center'>
      <button className='mt-4'
        onClick={onPay}
        style={{
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#53633f"
        }}
      >
        Pay Now
      </button>
      </div>
      </form>
      
    </div>
    </div>
  )
}

export default CardPayment