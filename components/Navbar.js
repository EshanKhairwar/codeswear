import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
const Navbar = ({ user,cart, addtoCart, removeFromCart, clearCart, subTotal }) => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const [dropdown, setDropdown] = useState(false)

const toggleDropdown=()=>{
setDropdown(!dropdown)
}

  return (
    <div className="flex  flex-col md:flex-row md:justify-start justify-center items-center shadow-md bg-white z-10 sticky top-0 py-2">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <Image src="/logo1.png" height={20} width={100} alt="" />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex m-0  items-center space-x-4 font-bold md:text-md">
          <Link href={"/tshirts"}>
            {" "}
            <li className="hover:text-pink-800">T Shirts</li>
          </Link>
          <Link href={"/hoodies"}>
            {" "}
            <li className="hover:text-pink-800">Hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            {" "}
            <li className="hover:text-pink-800">Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            {" "}
            <li className="hover:text-pink-800">Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart items-center absolute right-0 top-8 mx-5 flex">
      <div className="absolute right-8 top-7 rounded-md px-5 w-32 bg-pink-300">
        <ul>
          <li className="py-1 cursor-pointer hover:text-pink-700 text-sm">My Account</li>
          <li className="py-1 cursor-pointer hover:text-pink-700 text-sm">Orders</li>
          <li className="py-1 cursor-pointer hover:text-pink-700 text-sm">Logout</li>
        </ul>
       </div>
  
     {user.value && <MdAccountCircle onMouseOver={toggleDropdown} onMouseLeave={toggleDropdown} className="cursor-pointer hover:text-pink-800 text-xl md:text-2xl mx-2" />}
       {  !user.value && <Link href="/login">

<button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>

        </Link>
       }
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="cursor-pointer hover:text-pink-800 text-xl md:text-2xl"
        />
      </div>
   

      <div
        ref={ref}
        className={`w-72 h-[100vh] sideCart overflow-y-scroll  absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
          } `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-semibold">Your Cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
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
                      className="text-pink-500 cursor-pointer"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
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
                      className="text-pink-500 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="total font-bold my-2">SubTotal: ₹ {subTotal}</div>
        <div className="flex">
          <Link href="/checkout">
            <button className="flex  mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" /> Checkout
            </button>
          </Link>

          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
