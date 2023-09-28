import Head from "next/head";
import mongoose from "mongoose";
import Cab from "../models/Cab";

const Cabs = ({ cabs }) => {
	return (
		<div className="min-h-screen">
			<Head>
				<title>Cab | Uniconnect</title>
			</Head>

			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4 justify-center mx-5">
						{Object.keys(cabs).length === 0 && (
							<p>
								Sorry, All the Cabs are currently out of stock. New stock coming
								soon. Stay tuned!
							</p>
						)}
						{Object.keys(cabs).map((item) => (
							<div className="lg:w-1/3 md:w-1/2 p-4 w-full cursor-pointer shadow-md m-3" key={cabs[item]._id}>
								<div className="mt-4 text-center md:text-left">
									<h2 className="text-gray-900 title-font text-lg font-medium">
										From: {cabs[item].from}
									</h2>
									<h2 className="text-gray-900 title-font text-lg font-medium">
										To: {cabs[item].to}
									</h2>
									<h3 className="text-gray-500 text-xs tracking-widest title-font my-2">
										{cabs[item].desc}
									</h3>
									<p className="mt-2">Time: {cabs[item].time}</p>
								</div>
								<div className="flex my-6 items-center pb-5">
									<span className="title-font font-medium text-2xl text-gray-900">
										₹{cabs[item].price}
									</span>
									<button
										onClick={() => {
											window.location.href = `mailto:${cabs[item].email}`;
										}}
										className="flex ml-8 text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded disabled:bg-green-300"
									>
										Contact
									</button>
								</div>
							</div>
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

	let cabs = await Cab.find();

	return {
		props: { cabs: JSON.parse(JSON.stringify(cabs)) },
	};
}

export default Cabs;
