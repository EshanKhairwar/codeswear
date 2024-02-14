 import Razorpay from "razorpay"
 
 const checkout = async (req, res) => {

    var instance = new Razorpay({ key_id: 'rzp_test_ofAwZUSc5VRSc2', key_secret: 'bcfF0cvdtJaNuqXQbp2jLY0b' })
    const options = {
        "amount": 50000,
        "currency": "INR",
    }
    const order = await instance.orders.create(options)

    res.status(200).json({
        success: true,
        order,
    })
}

export default checkout
