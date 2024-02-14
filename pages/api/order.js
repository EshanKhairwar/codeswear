// import Razorpay from "razorpay"

// const Order=async(req,res)=>{
//     var instance =  new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET })

//   instance.orders.create({
//       "amount": 50000,
//       "currency": "INR",
//       "receipt": "receipt#1",
//       "partial_payment": false,
//       "notes": {
//         "key1": "value3",
//         "key2": "value2"
//       }
//     })

//     res.status(200).json({})
// }

// export default Order

import connectDb from "@/middleware/mongoose"
import Order from "@/models/Order"
import Razorpay from "razorpay"

// const Order=async(req,res)=>{
    // var instance =  new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET })

//   instance.orders.create({
//       "amount": 50000,
//       "currency": "INR",
//       "receipt": "receipt#1",
//       "partial_payment": false,
//       "notes": {
//         "key1": "value3",
//         "key2": "value2"
//       }
//     })

//     res.status(200).json({})
// }
const handler=async(req,res)=>{

  var instance =  new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET })

let order=new Order({
  email:req.body.email,
  orderId:req.body.orderId,
  address:req.body.address,
  amount:req.body.subTotal,
})

await order.save()

  if(req.method=="POST"){
    instance.orders.create({
      "amount": req.body.subTotal,
      "currency": "INR",
      "receipt": "receipt#1",
      "partial_payment": false,
      "notes": {
        "key1": "value3",
        "key2": "value2"
      },
      "userInfo":{
        "custId":req.body.email,
      }
    })
  }

}

export default connectDb(handler)