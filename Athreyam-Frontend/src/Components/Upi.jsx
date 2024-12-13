import React from 'react'

function Upi({ onPay }) {

  return (
    <div>
        <div style={{ marginTop: "20px", textAlign: "left", marginLeft: "auto", marginRight: "auto", maxWidth: "400px" }}>
      <h4>Scan to Pay</h4>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://via.placeholder.com/200"
          alt="QR Code"
          style={{ display: "block", margin: "0 auto" }}
        />
      </div>
      <button
        onClick={onPay}
        style={{
          marginTop: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
          borderRadius: "5px",
          display: "block",
          width: "100%",
        }}
      >
        Pay Now
      </button>
    </div>
    </div>
  )
}

export default Upi