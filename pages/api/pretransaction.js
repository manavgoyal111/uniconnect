import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";
import pincodes from "../../pincodes.json";

const Razorpay = require("razorpay");

const handler = async (req, res) => {
	const instance = new Razorpay({
		key_id: process.env.NEXT_PUBLIC_PAY_KEY_ID,
		key_secret: process.env.NEXT_PUBLIC_PAY_KEY_SECRET,
	});

	if (req.method == "POST") {
		try {
			// Generating Order ID
			const options = {
				amount: req.body.subTotal * 100,
				currency: "INR",
			};
			const orderData = await instance.orders.create(options);

			if (!orderData) {
				return res
					.status(500)
					.send({ success: false, data: "Some error Occured", cartClear: false });
			}

			// Check if user is not logged in
			if (req.body.email === "User not Logged in") {
				return res.status(400).json({
					success: false,
					data: "Please login to order",
					cartClear: false,
				});
			}

			// Check if the pincode is serviceable
			if (!Object.keys(pincodes).includes(req.body.pincode)) {
				return res.status(500).json({
					success: false,
					data: "Pincode not serviceable",
					cartClear: false,
				});
			}

			try {
				let product,
					sumTotal = 0,
					cart = req.body.cart;

				for (let item in req.body.cart) {
					sumTotal += cart[item].price * cart[item].qty;
					product = await Product.findOne({ slug: item });
					// Check if the cart items are out of Stock
					if (product.availableQty < cart[item].qty) {
						return res.status(500).json({
							success: false,
							data: "Some items in your cart went out of stock, please try with lesser quantity!",
							cartClear: true,
						});
					}

					// Check if the Cart is Tampered with
					if (product.price != cart[item].price) {
						return res.status(500).json({
							success: false,
							data: "Price of some items have changed, please try again!",
							cartClear: true,
						});
					}
				}

				if (sumTotal != req.body.subTotal) {
					return res.status(500).json({
						success: false,
						data: "Price of some items have changed, please try again.",
						cartClear: true,
					});
				}

				// Check if the details are valid
				if (req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))) {
					return res.status(500).json({
						success: false,
						data: "Please enter a 10 digit phone number",
						cartClear: false,
					});
				}
				if (req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))) {
					return res.status(500).json({
						success: false,
						data: "Please enter your 6 digit pincode",
						cartClear: false,
					});
				}

				// Initiate an Order corresponding to this OrderId
				let o = new Order({
					email: req.body.email,
					orderId: orderData.id,
					name: req.body.name,
					address: req.body.address,
					city: req.body.city,
					state: req.body.state,
					pincode: req.body.pincode,
					phone: req.body.phone,
					products: req.body.cart,
					amount: orderData.amount,
					status: orderData.status,
				});
				await o.save();
			} catch (err) {
				return res.status(500).json({
					success: false,
					data: "Some Error Occured",
					cartClear: false,
				});
			}

			res.status(200).json({ success: true, data: orderData });
		} catch (err) {
			return res.status(500).json({
				success: false,
				data: "Some Error Occured",
				cartClear: false,
			});
		}
	} else if (req.method == "GET") {
		try {
			res.status(200).json({ key: process.env.NEXT_PUBLIC_PAY_KEY_ID });
		} catch (err) {
			return res.status(500).json({
				success: false,
				data: err,
			});
		}
	}
};

export default connectDb(handler);
