import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
	if (req.method == "POST") {
		let p = new Product({
			title: req.body.title,
			slug: req.body.slug,
			desc: req.body.desc,
			price: req.body.price,
			category: req.body.category,
			img: req.body.img,
		});
		await p.save();
		res.status(200).json({ success: true });
	} else {
		res.status(400).json({ success: false, error: "This method is not allowed" });
	}
};

export default connectDb(handler);
