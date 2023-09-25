import pincodes from "../../pincodes.json";

export default function handler(req, res) {
	try {
		res.status(200).json({ success: true, data: pincodes });
	} catch (err) {
		res.status(400).json({ success: false, data: err });
	}
}
