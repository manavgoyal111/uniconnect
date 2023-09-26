import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const Orders = () => {
	const router = useRouter();

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token: localStorage.getItem("token") }),
			});
			let res = await a.json();
			setOrders(res.data);
		};

		if (!localStorage.getItem("token")) {
			router.push("/");
		} else {
			fetchOrders();
		}
	}, [router]);

	return (
		<div className="min-h-screen">
			<Head>
				<title>Orders | Uniconnect</title>
			</Head>

			<div className="container mx-auto w-11/12">
				<div className="flex flex-col">
					<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
							<div className="overflow-hidden">
								<h1 className="font-semibold text-2xl p-8 text-center">
									My Orders
								</h1>
								<table className="min-w-full">
									<thead className="bg-white border-b">
										<tr>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												#Order Id
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Name
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Amount
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Details
											</th>
										</tr>
									</thead>
									<tbody>
										{orders.map((order, idx) => (
											<tr
												key={idx}
												className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
											>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													#{order.orderId}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{order.email}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													₹{order.amount / 100}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<Link href={`/order?id=${order._id}`}>
														<button className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
															Details
														</button>
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orders;
