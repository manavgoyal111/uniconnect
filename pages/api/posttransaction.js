import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";

const crypto = require("crypto");
const Razorpay = require("razorpay");

const handler = async (req, res) => {
	const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

	// Generating Signature corresponding to the transaction for Validation
	const body = razorpay_order_id + "|" + razorpay_payment_id;
	const expectedSignature = crypto
		.createHmac("sha256", process.env.NEXT_PUBLIC_PAY_KEY_SECRET)
		.update(body.toString())
		.digest("hex");

	// Payment Invalid
	if (expectedSignature !== razorpay_signature) {
		res.status(400).json({ success: false, data: "Some error occurred" });
		return;
	}

	// Update the Order status
	const instance = new Razorpay({
		key_id: process.env.NEXT_PUBLIC_PAY_KEY_ID,
		key_secret: process.env.NEXT_PUBLIC_PAY_KEY_SECRET,
	});
	const orderInfo = await instance.payments.fetch(razorpay_payment_id);
	let order = await Order.findOneAndUpdate(
		{ orderId: razorpay_order_id },
		{
			paymentId: razorpay_payment_id,
			signature: razorpay_signature,
			status: orderInfo.status,
		}
	);

	// Update the Product quantity
	if (orderInfo.status === "captured") {
		let products = order.products;
		for (let slug in products) {
			await Product.findOneAndUpdate(
				{ slug: slug },
				{ $inc: { availableQty: -products[slug].qty } }
			);
		}
	}

	// Initiate Shipping

	// Redirect user to Order confirmation page
	res.redirect(`${process.env.NEXT_PUBLIC_HOST}/order?id=${order._id}&clearCart=1`);
};

export default connectDb(handler);
