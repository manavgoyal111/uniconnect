import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const token = req.body.token;
			const userData = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
			const userDbData = await User.findOneAndUpdate(
				{ email: userData.email },
				{
					name: req.body.name,
					address: req.body.address,
					pincode: req.body.pincode,
					phone: req.body.phone,
				}
			);
			res.status(200).json({ success: true, data: userDbData });
		} catch (err) {
			res.status(400).json({ success: false, data: err });
		}
	}
};

export default connectDb(handler);
