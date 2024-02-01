import Head from 'next/head';
import '../app/globals.css'
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
export default function App({ Component, pageProps }) {
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        let subt = 0;
        let keys = Object.keys(myCart);
    
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
    
        setSubTotal(subt);
    }

    useEffect(() => {
        console.log("Hey I am a useEffect from APp.js")
        try {
            if (localStorage.getItem("cart")) {
                setCart(JSON.parse(localStorage.getItem("cart")))
                saveCart(JSON.parse(localStorage.getItem("cart")))
            }           
        } catch (error) {
            console.error(error)
            localStorage.clear()
        }
    }, [])

    const addtoCart = (itemCode, qty, price, name, size, variant) => {
        let newCart = cart;
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty + qty
        }
        else {
            newCart[itemCode] = { qty: 1, price, name, size, variant }
        }
        setCart(newCart)
        saveCart(newCart)
    }

    const clearCart = () => {
        setCart({})
        saveCart({})
    }

    const removeFromCart = (itemCode, qty, price, name, size, variant) => {
        let newCart = JSON.parse(JSON.stringify(cart));
        if (itemCode in cart) {
            newCart[itemCode].qty = cart[itemCode].qty - qty
        }
        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode]
        }
        setCart(newCart)
        saveCart(newCart)
    }


    return <>
        <Head>
            <title>CodeSwear.com</title>
        </Head>
    
        <div>
            <Navbar key={subTotal} cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
            <Component cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
            <Footer />
        </div>
    </>;
}
