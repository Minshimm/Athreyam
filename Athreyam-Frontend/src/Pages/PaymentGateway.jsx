import React, { useState } from 'react'
import CardPayment from '../Components/CardPayment';
import Upi from '../Components/Upi';

const bankUrls = {
    hdfc: "https://netbanking.hdfcbank.com/netbanking/",
    icici: "https://www.icicibank.com/Personal-Banking/insta-banking/internet-banking/index.page",
    sbi: "https://retail.onlinesbi.sbi/retail/login.htm",
    axis: "https://retail.axisbank.co.in/",
  };
function PaymentGateway() {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
   
    const handlePayment = () => {
        alert(`Payment through ${paymentMethod} was successful!`);
      };
    const handleBankSelection = (bank) => {
        setSelectedBank(bank);
        if (bankUrls[bank]) {
          window.location.href = bankUrls[bank]; // Redirect to the actual bank login page
        }
      };
  return (
    <div>
    <div className="row bg-white">
       <div className='col-6 text-dark fs-4'>
           <h2 className='fw-bold text-center py-5 text-uppercase' style={{letterSpacing: "5px", color: "#53633f"}}>Select Payment Method</h2>
         <div>
        <label className='pb-3 ps-5'>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Credit/Debit Card
        </label>
        <br />
        <label className='pb-3 ps-5'>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
          UPI
        </label>
        <br />
        <label className='pb-3 ps-5'>
          <input
            type="radio"
            value="netbanking"
            checked={paymentMethod === "netbanking"}
            onChange={() => setPaymentMethod("netbanking")}
          />
          Net Banking
        </label>
      </div>
   </div>
   <div className='col-6' >
      {/* Net Banking Options */}
      {paymentMethod === "netbanking" && (
        <div style={{ marginTop: "20px" }}>
          <h4>Select Your Bank</h4>
          <select
            value={selectedBank}
            onChange={(e) => handleBankSelection(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          >
            <option value="">-- Select Bank --</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="axis">Axis Bank</option>
          </select>
        </div>
      )}
      {/* Render Card Payment Form */}
      {paymentMethod === "card" && (
        <CardPayment onPay={handlePayment} />
      )}

      {/* Render UPI Payment Component */}
      {paymentMethod === "upi" && <Upi onPay={handlePayment} />}
    </div>
</div>
</div>
  )
}

export default PaymentGateway

