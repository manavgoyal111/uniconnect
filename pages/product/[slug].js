import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "../../models/Product";

const Post = ({ addToCart, buyNow, product, error }) => {
	const router = useRouter();
	const { slug } = router.query;

	const [pin, setPin] = useState();
	const [service, setService] = useState();

	const checkServiceability = async () => {
		let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
		let pinJson = await pins.json();
		if (Object.keys(pinJson.data).includes(pin)) {
			setService(true);
			toast.success("Your pincode is serviceable!", {
				position: "bottom-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			setService(false);
			toast.error("Sorry! pincode not serviceable", {
				position: "bottom-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const onChangePin = (e) => {
		setPin(e.target.value);
	};

	if (error == 404) {
		return (
			<main className="h-screen w-full flex flex-col justify-center items-center bg-green-400">
				<h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
				<div className="bg-green-600 px-2 text-sm rounded rotate-12 absolute">
					Page Not Found
				</div>
				<button className="mt-5">
					<a className="relative inline-block text-sm font-medium text-gray-600 group active:text-gray-800 focus:outline-none focus:ring">
						<span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-green-800 group-hover:translate-y-0 group-hover:translate-x-0"></span>

						<span className="relative block px-8 py-3 bg-green-600 border border-current">
							<Link href="/">
								<a>Go Home</a>
							</Link>
						</span>
					</a>
				</button>
			</main>
		);
	}

	return (
		<div>
			<Head>
				<title>{product.title} | Uniconnect</title>
			</Head>

			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 py-16 mx-auto">
					<div className="lg:w-11/12 mx-auto flex flex-wrap justify-center">
						<Image
							alt="product"
							className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
							src={product.img}
							height={400}
							width={500}
						/>
						<div className="lg:w-1/2 w-full lg:pl-16 lg:py-6 mt-6 lg:mt-0">
							<h2 className="text-sm title-font text-gray-500 tracking-widest">
								Uniconnect
							</h2>
							<h1 className="text-gray-900 text-3xl title-font font-medium my-1 border-b-2 border-gray-100 pb-5">
								{product.title}
							</h1>
							<p className="leading-relaxed">{product.desc}</p>
							<div className="flex my-6 items-center pb-5">
								<span className="title-font font-medium text-2xl text-gray-900">
									₹{product.price}
								</span>
								<button
									onClick={() => {
										buyNow(slug, product.price, product.title);
									}}
									className="flex ml-8 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded disabled:bg-green-300"
								>
									Buy Now
								</button>
								<button
									onClick={() => {
										addToCart(
											slug,
											product.price,
											product.title
										);
									}}
									className="flex ml-4 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded disabled:bg-green-300"
								>
									Add to Cart
								</button>
							</div>
							<div className="pin mt-6 flex space-x-2 text-sm">
								<input
									type="text"
									onChange={onChangePin}
									placeholder="Enter Your Pincode"
									className="px-2 border-2 border-gray-400 rounded-md"
								/>
								<button
									onClick={checkServiceability}
									className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
								>
									Check
								</button>
							</div>
							{!service && service != null && (
								<div className="text-red-600 mt-3 text-sm">
									Sorry! We do not deliver to this pincode yet
								</div>
							)}
							{service && service != null && (
								<div className="text-green-600 mt-3 text-sm">
									Yay! This pincode is serviceable
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export async function getServerSideProps(context) {
	if (!mongoose.connections[0].readyState) {
		await mongoose.connect(process.env.MONGO_URI);
	}

	let error = null;
	let product = await Product.findOne({ slug: context.query.slug });

	if (product == null) {
		return {
			props: {
				error: 404,
			},
		};
	}

	return {
		props: {
			error,
			product: JSON.parse(JSON.stringify(product)),
		},
	};
}

export default Post;
