import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
	AiOutlineShoppingCart,
	AiFillCloseCircle,
	AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ user, logout, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
	const router = useRouter();

	const ref = useRef();

	const [dropdown, setDropdown] = useState(false);
	const [sidebar, setSidebar] = useState(false);

	useEffect(() => {
		// Sidebar open by default if cart is not empty
		Object.keys(cart).length !== 0 && setSidebar(true);

		// Sidebar closed by default in these routes
		const exempted = [
			"/checkout",
			"/orders",
			"/order",
			"/myaccount",
			"/login",
			"/forgot",
			"/signup",
			"/admin",
			"/",
		];
		if (exempted.includes(router.pathname)) {
			setSidebar(false);
		}
	}, [cart]);

	const toggleCart = () => {
		setSidebar(!sidebar);
	};

	return (
		<>
			{!sidebar && (
				<span className="fixed right-10 top-4 z-30 cursor-pointer">
					{dropdown && (
						<div
							onMouseOver={() => {
								setDropdown(true);
							}}
							onMouseLeave={() => {
								setDropdown(false);
							}}
							className="absolute right-3 top-5 rounded-md p-2 w-32 bg-white shadow-lg border z-30"
						>
							<ul>
								<Link href="/myaccount">
									<a>
										<li className="py-1 text-sm hover:text-green-700 font-bold cursor-pointer">
											My Account
										</li>
									</a>
								</Link>
								<Link href="/orders">
									<a>
										<li className="py-1 text-sm hover:text-green-700 font-bold cursor-pointer">
											My Orders
										</li>
									</a>
								</Link>
								<Link href="/admin">
									<a>
										<li className="py-1 text-sm hover:text-green-700 font-bold cursor-pointer">
											Admin
										</li>
									</a>
								</Link>
								<li
									onClick={logout}
									className="py-1 text-sm hover:text-green-700 font-bold cursor-pointer"
								>
									Logout
								</li>
							</ul>
						</div>
					)}
					<span
						onMouseOver={() => {
							setDropdown(true);
						}}
						onMouseLeave={() => {
							setDropdown(false);
						}}
					>
						{user.value && <MdAccountCircle className="text-xl md:text-2xl mx-2" />}
					</span>
				</span>
			)}

			<div
				className={`flex flex-col md:flex-row md:justify-start justify-center items-center px-5 py-2 shadow-md sticky top-0 bg-white z-10 ${!sidebar && "overflow-hidden"
					}`}
			>
				<div className="logo mr-auto md:mx-5">
					<Link href="/">
						<a className="flex justify-center text-green-500 font-bold my-2">
							Uniconnect
						</a>
					</Link>
				</div>

				<nav>
					<ul className="flex items-center space-x-4 font-bold md:text-md">
						<Link href="/products">
							<a className="hover:text-gray-800">
								<li>Products</li>
							</a>
						</Link>
						<Link href="/cabs">
							<a className="hover:text-gray-800">
								<li>Cabs</li>
							</a>
						</Link>
					</ul>
				</nav>

				<div className="cart cursor-pointer absolute right-4 top-4 flex items-center">
					{!user.value && (
						<Link href="/login">
							<a className="hover:text-gray-800">
								<button className="flex items-center text-white bg-green-500 border-0 py-1 px-2 mx-2 focus:outline-none hover:bg-green-600 rounded text-sm">
									Login
								</button>
							</a>
						</Link>
					)}
					<AiOutlineShoppingCart
						onClick={toggleCart}
						className="text-xl md:text-2xl hover:text-gray-800"
					/>
				</div>

				<div
					ref={ref}
					className={`sideCart absolute w-72 h-[100vh] top-0 bg-green-100 px-8 py-10 overscroll-y-contain transition-all ${sidebar ? "right-0" : "-right-96"
						}`}
				>
					<h2 className="font-bold text-xl text-center">Shopping Cart</h2>
					<span
						onClick={toggleCart}
						className="absolute top-4 right-4 cursor-pointer text-2xl text-green-500"
					>
						<AiFillCloseCircle />
					</span>
					<ol className="list-decimal font-semibold">
						{Object.keys(cart).length === 0 && (
							<div className="my-4 font-semibold">Your cart is empty!</div>
						)}
						{Object.keys(cart).map((k, idx) => {
							return (
								<li key={idx}>
									<div className="item flex my-5">
										<div className="w-2/3 font-semibold">
											{cart[k].name} (₹{cart[k].price})
										</div>
										<div className="flex items-center justify-center w-1/3 font-semibold text-lg">
											<AiFillMinusCircle
												onClick={() => {
													removeFromCart(
														k,
														1,
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
					<div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
					<div className="flex">
						<Link href="/checkout">
							<a>
								<button
									disabled={Object.keys(cart).length === 0}
									className="flex mx-auto items-center text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-sm disabled:bg-green-300"
								>
									<BsFillBagCheckFill className="mx-1" /> Checkout
								</button>
							</a>
						</Link>
						<button
							onClick={clearCart}
							disabled={Object.keys(cart).length === 0}
							className="flex mx-auto items-center text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-sm disabled:bg-green-300"
						>
							Clear Cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
