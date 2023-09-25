import connectDb from "../../middleware/mongoose";
import Forgot from "../../models/Forgot";
import User from "../../models/User";

var CryptoJS = require("crypto-js");
const http = require("https");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			// User does not exist
			let userDbData = await User.findOne({ email: req.body.email });
			if (!userDbData) {
				return res.status(400).json({ success: false, data: "User doesn't exist!" });
			}

			if (req.body.sendMail) {
				// Generate Random Token
				let resetToken =
					Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);

				let forgot = new Forgot({
					email: req.body.email,
					token: resetToken,
				});
				await forgot.save();

				const emailBody = `We have sent you this email in response to your request to reset your password on Sareewear.com.
                To reset your password, please follow the link below:
                <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?resetToken=${resetToken}&email=${req.body.email}">Click Here to Reset your Password</a>
                <br/><br/>
                We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and change your Password.
                <br/><br/>`;

				// Send Email
				const options = {
					method: "POST",
					hostname: "api.msg91.com",
					port: null,
					path: "/api/v5/email/send",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						authkey: "YOUR_MSG91_AUTH_KEY",
					},
				};

				const req = http.request(options, function (res) {
					const chunks = [];
					res.on("data", function (chunk) {
						chunks.push(chunk);
					});
					res.on("end", function () {
						const body = Buffer.concat(chunks);
						console.log(body.toString());
					});
				});

				req.write({
					to: [
						{
							email: req.body.email,
						},
					],
					from: {
						name: "Uniconnect",
						email: "manav.goyal.dev@gmail.com",
					},
					cc: [
						{
							email: "cc@email.address",
						},
						{
							email: "test@email.address",
						},
					],
					bcc: [
						{
							email: "bcc@email.address",
						},
						{
							email: "test1@email.address",
						},
					],
					domain: "The domain which you have registered with us. We sign DKIM with this domain.",
					mail_type_id:
						"1 for Transactional, 2 for Notificational, 3 for Promotional - Default is 3",
					in_reply_to:
						"If the current mail is reply of any mail then that mail Message ID.",
					reply_to: [
						{
							email: "mail1@domain.com",
						},
						{
							email: "mail2@domain.com",
						},
					],
					attachments: [
						{
							filePath: "Public path for file.",
							fileName: "File Name",
						},
						{
							file: "File in Data URI format data:content/type;base64,<data>.",
							fileName: "File Name",
						},
					],
					template_id: "YOUR_UNIQUE_TEMPLATE_NAME",
					variables: {
						VAR1: "VAR1 VALUE",
						VAR2: "VAR2 VALUE",
					},
				});
				req.end();

				res.status(200).json({ success: true, data: "Email Sent!" });
			} else {
				// Reset the password
				const resetToken = await Forgot.findOne({ email: req.body.email });
				if (req.body.token == resetToken.token) {
					userDbData = await User.findOneAndUpdate(
						{ email: req.body.email },
						{
							password: CryptoJS.AES.encrypt(
								req.body.password,
								process.env.NEXT_PUBLIC_AES_SECRET
							).toString(),
						}
					);
					res.status(200).json({ success: true, data: userDbData });
				} else {
					res.status(200).json({ success: false, data: "Error!" });
				}
			}
		} catch (err) {
			res.status(500).json({ success: false, data: err });
		}
	}
};

export default connectDb(handler);
