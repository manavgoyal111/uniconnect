import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	try {
		const token = req.body.token;
		const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
		let orders = await Order.find({ email: data.email, status: "captured" });
		res.status(200).json({ success: true, data: orders });
	} catch (err) {
		res.status(400).json({ success: false, data: err });
	}
};

export default connectDb(handler);
