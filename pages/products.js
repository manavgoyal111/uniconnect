import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import mongoose from "mongoose";
import Product from "../models/Product";

const Prod = ({ products }) => {
	return (
		<div className="min-h-screen">
			<Head>
				<title>Products | Uniconnect</title>
			</Head>

			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4 justify-center mx-5">
						{Object.keys(products).length === 0 && (
							<p>
								Sorry, All the Prods are currently out of stock. New stock coming
								soon. Stay tuned!
							</p>
						)}
						{Object.keys(products).map((item) => (
							<Link
								href={`/product/${products[item].slug}`}
								passHref
								key={products[item]._id}
							>
								<div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-md m-3">
									<a className="block relative rounded overflow-hidden">
										<Image
											alt="ecommerce"
											className="m-auto md:mx-0 block"
											src={products[item].img}
											height={700}
											width={700}
										/>
									</a>
									<div className="mt-4 text-center md:text-left">
										<h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
											{products[item].category}
										</h3>
										<h2 className="text-gray-900 title-font text-lg font-medium">
											{products[item].title}
										</h2>
										<p className="mt-1">₹{products[item].price}</p>
									</div>
								</div>
							</Link>
						))}
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

	let products = await Product.find();

	return {
		props: { products: JSON.parse(JSON.stringify(products)) },
	};
}

export default Prod;
