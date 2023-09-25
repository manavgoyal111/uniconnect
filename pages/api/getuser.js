import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).json({ success: false, data: "Invalid request" });
		return;
	}

	try {
		const token = req.body.token;
		const userData = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
		const userDbData = await User.findOne({ email: userData.email });
		const { name, email, address, pincode, phone } = userDbData;
		res.status(200).json({ success: true, data: { name, email, address, pincode, phone } });
	} catch (err) {
		res.status(400).json({ success: false, data: err });
	}
};

export default connectDb(handler);
