import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SchemaType } from "mongoose";

const MyApp = ({ Component, pageProps }) => {
	const router = useRouter();

	const [cart, setCart] = useState({});
	const [subTotal, setSubTotal] = useState(0);
	const [user, setUser] = useState({ value: null });
	const [key, setKey] = useState();
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			setProgress(40);
		});
		router.events.on("routeChangeComplete", () => {
			setProgress(100);
		});

		try {
			if (localStorage.getItem("cart")) {
				setCart(JSON.parse(localStorage.getItem("cart")));
				saveCart(JSON.parse(localStorage.getItem("cart")));
			}
		} catch (error) {
			console.log(error);
			localStorage.clear();
		}
		const token = localStorage.getItem("token");
		if (token) {
			setUser({ value: token });
		}
		setKey(Math.random());
	}, [router]);

	const saveCart = (myCart) => {
		localStorage.setItem("cart", JSON.stringify(myCart));
		let subt = 0;
		let keys = Object.keys(myCart);
		for (let i = 0; i < keys.length; i++) {
			subt += myCart[keys[i]]["price"] * myCart[keys[i]].qty;
		}
		setSubTotal(subt);
	};

	const addToCart = (itemCode, qty, price, name, size, variant) => {
		let newCart = JSON.parse(JSON.stringify(cart));
		if (itemCode in cart) {
			newCart[itemCode].qty = cart[itemCode].qty + qty;
		} else {
			newCart[itemCode] = { qty: 1, price, name, size, variant };
		}
		setCart(newCart);
		saveCart(newCart);
	};

	const removeFromCart = (itemCode, qty, price, name, size, variant) => {
		let newCart = JSON.parse(JSON.stringify(cart));
		if (itemCode in cart) {
			newCart[itemCode].qty = cart[itemCode].qty - qty;
		}
		if (newCart[itemCode]["qty"] <= 0) {
			delete newCart[itemCode];
		}
		setCart(newCart);
		saveCart(newCart);
	};

	const clearCart = () => {
		setCart({});
		saveCart({});
	};

	const buyNow = (itemCode, qty, price, name, size, variant) => {
		let newCart = {};
		newCart[itemCode] = { qty: 1, price, name, size, variant };
		saveCart(newCart);
		setCart(newCart);
		router.push("/checkout");
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser({ value: null });
		router.push("/");
		setKey(Math.random());
	};

	return (
		<div>
			<LoadingBar
				color="#87CEEB"
				progress={progress}
				waitingTime={400}
				onLoaderFinished={() => setProgress(0)}
			/>

			{key && !router.pathname.match(/admin/g) && (
				<Navbar
					key={key}
					logout={logout}
					user={user}
					cart={cart}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
					clearCart={clearCart}
					subTotal={subTotal}
				/>
			)}

			<Component
				cart={cart}
				addToCart={addToCart}
				removeFromCart={removeFromCart}
				clearCart={clearCart}
				buyNow={buyNow}
				subTotal={subTotal}
				{...pageProps}
			/>

			{!router.pathname.match(/admin/g) && <Footer />}
		</div>
	);
};

export default MyApp;

// Organize assets folder
// Implement a search bar in the products page, display only the searched category of items
// Remove extra items from navbar cart and Check if ordering service is working
