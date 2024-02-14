import Head from 'next/head';
import '../app/globals.css'
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'
import Script from 'next/script';

export default function App({ Component, pageProps }) {
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    const [user, setUser] = useState({value:null})
    const [key, setKey] = useState()
    const [progress, setProgress] = useState(0)
const router=useRouter()



useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
        setProgress(40)
        })
    router.events.on('routeChangeComplete', ()=>{
    setProgress(100)
    })
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
   const token=localStorage.getItem('token')
   if(token){
    setUser({value:token})
}
setKey(Math.random())
}, [router.query])

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        let subt = 0;
        let keys = Object.keys(myCart);
    
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
    
        setSubTotal(subt);
    }



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

    const buyNow=(itemCode, qty, price, name, size, variant)=>{
        let newCart = {itemCode:{ qty: 1, price, name, size, variant }};

        setCart(newCart)
        
        saveCart(newCart)
        router.push('/checkout')
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

    const logout=()=>{
        localStorage.removeItem('token')
        setUser({value:null})
        setKey(Math.random())
        router.push('/')
    }

    return <>
        <Head>
            <title>CodeSwear.com</title>
            <link rel="icon" type="image/x-icon" href="/app/favicon.ico"/>
        </Head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <div>
        <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
           { key && <Navbar logout={logout} user={user} key={key} cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}            <Component buyNow={buyNow} cart={cart} addtoCart={addtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
            <Footer />
 
        </div>
    </>;
}
