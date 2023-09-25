import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("User not Logged in");
	const [phone, setPhone] = useState("");
	const [pincode, setPincode] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [npassword, setNpassword] = useState("");
	const [cpassword, setCpassword] = useState("");

	useEffect(() => {
		const getUser = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token: localStorage.getItem("token") }),
			});
			const userRes = await res.json();
			if (userRes.success) {
				setEmail(userRes.data.email);
				setName(userRes.data.name);
				setAddress(userRes.data.address);
				setPincode(userRes.data.pincode);
				setPhone(userRes.data.phone);
			} else {
				setEmail("Please login to continue...");
				router.push("/");
			}
		};
		getUser();
	}, [router]);

	const handleChange = async (e) => {
		if (e.target.name == "name") {
			setName(e.target.value);
		} else if (e.target.name == "phone") {
			setPhone(e.target.value);
		} else if (e.target.name == "pincode") {
			setPincode(e.target.value);
		} else if (e.target.name == "address") {
			setAddress(e.target.value);
		} else if (e.target.name == "password") {
			setPassword(e.target.value);
		} else if (e.target.name == "npassword") {
			setNpassword(e.target.value);
		} else if (e.target.name == "cpassword") {
			setCpassword(e.target.value);
		}
	};

	const handleUserSubmit = async () => {
		let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: localStorage.getItem("token"),
				name,
				address,
				phone,
				pincode,
			}),
		});
		let userRes = await res.json();
		if (userRes.success) {
			toast.success(`Successfully Updated Details!`, {
				position: "top-left",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error(`Error: ${userRes.data}`, {
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

	const handlePasswordSubmit = async () => {
		let userRes;
		if (npassword == cpassword) {
			let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: localStorage.getItem("token"),
					password,
					npassword,
					cpassword,
				}),
			});
			userRes = await res.json();
		} else {
			userRes = { success: false, data: "Confirm Password does not match!" };
		}
		if (userRes.success) {
			toast.success(`Successfully Updated Password!`, {
				position: "top-left",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error(`Error: ${userRes.data}`, {
				position: "top-left",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		setPassword("");
		setNpassword("");
		setCpassword("");
	};

	return (
		<div className="min-h-screen">
			<Head>
				<title>My Account | Uniconnect</title>
			</Head>

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
				<h1 className="font-bold text-3xl my-8 text-center">Update Your Account</h1>
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
							<label htmlFor="email" className="leading-7 text-sm text-gray-600">
								Email (Cannot be Updated)
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
						<label htmlFor="address" className="leading-7 text-sm text-gray-600">
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
							<label htmlFor="phone" className="leading-7 text-sm text-gray-600">
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
							<label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
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
				<button
					onClick={handleUserSubmit}
					className="flex mx-auto items-center text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-sm disabled:bg-green-300"
				>
					Submit
				</button>

				<h2 className="font-semibold text-xl my-2">2. Change Password</h2>
				<div className="mx-auto flex">
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="password" className="leading-7 text-sm text-gray-600">
								Old Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={handleChange}
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="npassword" className="leading-7 text-sm text-gray-600">
								New Password
							</label>
							<input
								type="password"
								id="npassword"
								name="npassword"
								value={npassword}
								onChange={handleChange}
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
					<div className="px-2 w-1/2">
						<div className="mb-4">
							<label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">
								Confirm New Password
							</label>
							<input
								type="password"
								id="cpassword"
								name="cpassword"
								value={cpassword}
								onChange={handleChange}
								className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
					</div>
				</div>
				<button
					onClick={handlePasswordSubmit}
					className="flex mx-auto items-center text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-sm disabled:bg-green-300"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default MyAccount;
