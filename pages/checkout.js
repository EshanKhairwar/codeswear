import React, { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const Checkout = ({ cart, addtoCart, removeFromCart, subTotal }) => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')

  const [disabled,setDisabled] = useState(true)

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    // else if (e.target.name == 'city') {
    //   setCity(e.target.value)
    // }
    // else if (e.target.name == 'state') {
    //   setState(e.target.value)
    // }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
    }

setTimeout(()=>{
  if(name.length>3 && email.length>3 && phone.length>3 && address.length>3 && pincode.length>3){
    setDisabled(false)
     }
     else{
       setDisabled(true)
     }
},100)
  }


  const makePayment = () => {


    // Get  transaction token

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      amount: subTotal * 100,
      currency: "INR",
      description: "Acme Corp",
      data: {
        orderId: Math.floor(Math.random() * Date.now()),
        cart,
        subTotal,
        email:email,
        name,
        address,
        pincode,
        phone
      },
      image: "https://avatars.githubusercontent.com/u/112632325?v=4",
      prefill: {
        email: "eshankhairwar@gmail.com",
        contact: +917588145768,
      },
      config: {
        display: {
          blocks: {
            utib: {
              //name for Axis block
              name: "Pay using Axis Bank",
              instruments: [
                {
                  method: "card",
                  issuers: ["UTIB"],
                },
                {
                  method: "netbanking",
                  banks: ["UTIB"],
                },

              ],
            },
            other: {
              //  name for other block
              name: "Other Payment modes",
              instruments: [
                {
                  method: "card",
                  issuers: ["ICIC"],
                },
                {
                  method: "upi",
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          sequence: ["block.utib", "block.other"],
          preferences: {
            show_default_blocks: false, // Should Checkout show its default blocks?
          },
        },
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);
        localStorage.setItem('razorpay_payment_id', response.razorpay_payment_id);
        router.push('/order')
      },
      modal: {
        ondismiss: function () {
          if (confirm("Are you sure, you want to close the form?")) {
            let txt = "You pressed OK!";
            console.log("Checkout form closed by the user");
          } else {
            let txt = "You pressed Cancel!";
            console.log("Complete the Payment");
          }
        },
      },
    };
    var rzp1 = new Razorpay(options);
    document.getElementById("rzp-button1").onclick = function (e) {
      rzp1.open();
      e.preventDefault();
    };
  };

  return (
    <div className="container mx-auto md:px-24 px-4">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-width, initial-scale=1.0, maximum scale=1.0"
        />
      </Head>
      {/* <Script src={`${process.env.PAYTM_HOST}/merchantpgui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} onLoad="onScriptLoad();" /> */}
      <h1 className="font-bold text-3xl text-center mt-5 my-8">Checkout</h1>
      <h2 className="font-bold text-xl my-4">Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={name}
              id="name"
              name="name"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea

            value={address}
            id="address"
            name="address"
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            rows={2}
            cols={30}
          />
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">

          <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="number"
              id="pincode"
              value={pincode}
              onChange={handleChange}
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />

     
          </div>
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              // onChange={handleChange}
              value={state}
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           readOnly={true}
           />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              value={city}
              // onChange={handleChange}
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            readOnly={true}
            />
          </div>
        </div>
      </div>

      <h2 className="font-bold text-xl my-4">Review Cart Items & Pay</h2>

      <div className="w-full sideCart bg-pink-100 px-6 rounded-lg py-2 m-2">
        <ol className="list-decimal font-semibold ">
          {/* empty cart message */}
          {Object.keys(cart).length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <BsBagCheckFill size={50} className="mt-4 text-pink-400" />
              <h2 className="text-xl font-sm mt-3">Your cart is empty</h2>
            </div>
          )}

          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5 x">
                  <div className="font-semibold">{cart[k].name}</div>
                  <div className="flex items-center justify-center w-1/3 font-semibold">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2">{cart[k].qty} </span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addtoCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <span className="font-bold pb-2">Subtotal: ₹{subTotal}</span>
      </div>
      <div className="mt-4">
        <button
          disabled={disabled}
          id="rzp-button1"
          onClick={makePayment}
          className="flex ml-4 text-white disabled:bg-pink-300 bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-sm"
        >
          <BsBagCheckFill className="m-1" />
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
