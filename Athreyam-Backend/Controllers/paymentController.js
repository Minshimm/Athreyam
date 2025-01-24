const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: 'rzp_test_NXw9ecJZciw1N9', 
    key_secret: 'M9q54kegvRwWP6uMVvxbQl47', 
});

// Create Order API
exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Math.random()}` ,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Verify Payment API
exports.verifyPayment = async (req, res) => {
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
    
        const expectedSignature = crypto
            .createHmac('sha256', 'M9q54kegvRwWP6uMVvxbQl47')
            .update(body.toString())
            .digest('hex');
    
        if (expectedSignature === razorpay_signature) {
            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ message: 'Payment verification failed' });
        }
    }
    catch(error){
        console.error('Error verifying Razorpay payment:', error);
        res.status(500).json({ message: 'Failed to verify payment' });
    }
};