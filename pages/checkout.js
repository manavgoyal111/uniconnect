import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("User not Logged in");
	const [phone, setPhone] = useState("");
	const [pincode, setPincode] = useState("");
	const [address, setAddress] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			const res = await fetch(
				process.env.NODE_ENV === "development"
					? `${process.env.NEXT_PUBLIC_HOST}/api/getuser`
					: `${process.env.NEXT_PUBLIC_HOST}/api/getUser`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token: localStorage.getItem("token") }),
				}
			);
			const userRes = await res.json();
			if (userRes.success) {
				setEmail(userRes.data.email);
				setName(userRes.data.name);
				setAddress(userRes.data.address);
				setPhone(userRes.data.phone);
				setPincode(userRes.data.pincode);
				getPincodeData(userRes.data.pincode);
			} else {
				setEmail("Please login to continue...");
			}
		};
		getUser();
	}, []);

	useEffect(() => {
		if (
			name.length > 3 &&
			email.length > 3 &&
			toString(phone).length > 3 &&
			address.length > 3 &&
			pincode.length > 3 &&
			subTotal > 0
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [name, email, phone, pincode, address, subTotal]);

	const getPincodeData = async (pincode) => {
		if (pincode.length == 6) {
			let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
			let pinsRes = await pins.json();
			let pinJson = pinsRes.data;
			if (Object.keys(pinJson).includes(pincode)) {
				setState(pinJson[pincode][1]);
				setCity(pinJson[pincode][0]);
			} else {
				setState("NA");
				setCity("NA");
			}
		} else {
			setState("NA");
			setCity("NA");
		}
	};

	const handleChange = async (e) => {
		if (e.target.name == "name") {
			setName(e.target.value);
		} else if (e.target.name == "phone") {
			setPhone(e.target.value);
		} else if (e.target.name == "pincode") {
			setPincode(e.target.value);
			getPincodeData(e.target.value);
		} else if (e.target.name == "address") {
			setAddress(e.target.value);
		}
	};

	const initiatePayment = async () => {
		// console.log(phone.length, phone, toString(phone), toString(phone).length);
		const orderData = {
			subTotal,
			cart,
			email,
			name,
			phone,
			pincode,
			address,
			city,
			state,
		};
		const orderRes = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(orderData),
			}
		);
		const orderDataRes = await orderRes.json();
		const { success, data, cartClear } = orderDataRes;

		if (success) {
			const orderKey = await fetch(
				`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const orderKeyRes = await orderKey.json();

			const options = {
				key: orderKeyRes,
				amount: data.amount,
				currency: "INR",
				name: "Uniconnect",
				description: "Wear a Saree with Style",
				image:
					"14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlY2tvdXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
				order_id: data.id,
				callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
				prefill: {
					name: name,
					email: email,
					contact: phone,
				},
				notes: {
					address: address,
				},
				theme: {
					color: "#DB2777",
				},
			};

			var razor = new window.Razorpay(options);
			razor.open();
		} else {
			localStorage.removeItem("cart");
			if (cartClear) {
				clearCart();
			}
			toast.error(data, {
				position: "top-left",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<div className="min-h-screen">
			<Head>
				<meta
					name="viewport"
					content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
				/>
				<title>Checkout | Uniconnect.com</title>
			</Head>

			<Script
				type="application/javascript"
				crossorigin="anonymous"
				src="https://checkout.razorpay.com/v1/checkout.js"
			/>

			<ToastContainer
				position="top-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<div className="container sm:m-auto px-2 md:w-10/12">
				<h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
				<h2 className="font-semibold text-xl my-2">1. Delivery Details</h2>
				<div className="mx-auto flex">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="name" className="leading-7 text-sm text-gray-600">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={name}
								onChange={handleChange}
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label
								htmlFor="email"
								className="leading-7 text-sm text-gray-600"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								readOnly
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
				</div>
				<div className="px-2 w-full">
					<div className="mb-4">
						<label
							htmlFor="address"
							className="leading-7 text-sm text-gray-600"
						>
							Address
						</label>
						<textarea
							id="address"
							name="address"
							cols="30"
							rows="2"
							value={address}
							onChange={handleChange}
							className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>
				<div className="mx-auto flex">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label
								htmlFor="phone"
								className="leading-7 text-sm text-gray-600"
							>
								Phone
							</label>
							<input
								type="number"
								id="phone"
								name="phone"
								value={phone}
								min={0}
								onChange={handleChange}
								placeholder="Your 10-Digit Phone Number"
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
								name="pincode"
								value={pincode}
								min={0}
								onChange={handleChange}
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
				</div>
				<div className="mx-auto flex">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label
								htmlFor="state"
								className="leading-7 text-sm text-gray-600"
							>
								State
							</label>
							<input
								type="text"
								id="state"
								name="state"
								value={state}
								onChange={handleChange}
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="city" className="leading-7 text-sm text-gray-600">
								District
							</label>
							<input
								type="text"
								id="city"
								name="city"
								value={city}
								onChange={handleChange}
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
				</div>

				<h2 className="font-semibold text-xl my-2">
					2. Review Cart Items & Pay
				</h2>
				<div className="sideCart bg-green-100 p-6 m-2 transform z-10">
					<ol className="list-decimal font-semibold">
						{Object.keys(cart).length === 0 && (
							<div className="my-4 font-semibold">Your cart is empty!</div>
						)}
						{Object.keys(cart).map((k, idx) => {
							return (
								<li key={idx}>
									<div className="item flex my-5">
										<div className="font-semibold">
											{cart[k].name} (₹{cart[k].price})
										</div>
										<div className="flex items-center justify-center w-1/3 font-semibold text-lg">
											<AiFillMinusCircle
												onClick={() => {
													removeFromCart(
														k,
														1
													);
												}}
												className="cursor-pointer text-green-500"
											/>
										</div>
									</div>
								</li>
							);
						})}
					</ol>
					<span className="font-bold">Subtotal: ₹{subTotal}</span>
				</div>
				<div className="mx-4">
					<button
						onClick={initiatePayment}
						disabled={disabled}
						className="flex mx-auto items-center text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-sm disabled:bg-green-300"
					>
						<BsFillBagCheckFill className="mr-2" />
						Pay ₹{subTotal}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
