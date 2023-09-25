import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const userData = jwt.verify(req.body.token, process.env.NEXT_PUBLIC_JWT_SECRET);
			let userDbData = await User.findOne({ email: userData.email });
			const bytes = CryptoJS.AES.decrypt(
				userDbData.password,
				process.env.NEXT_PUBLIC_AES_SECRET
			);
			let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

			if (decryptedPass != req.body.password || req.body.npassword != req.body.cpassword) {
				return res.status(400).json({ success: false, data: "Password does not match!" });
			}
			userDbData = await User.findOneAndUpdate(
				{ email: userData.email },
				{
					password: CryptoJS.AES.encrypt(
						req.body.npassword,
						process.env.NEXT_PUBLIC_AES_SECRET
					).toString(),
				}
			);
			res.status(200).json({ success: true, data: userDbData });
		} catch (err) {
			res.status(500).json({ success: false, data: "Internal server error" });
		}
	}
};

export default connectDb(handler);
