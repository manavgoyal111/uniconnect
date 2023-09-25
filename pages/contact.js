import Head from "next/head";

const Contact = () => {
	return <div className="min-h-screen">
		<Head>
			<meta
				name="description"
				content="Uniconnect.com - Contact information"
			/>
			<title>Contact | Uniconnect.com</title>
		</Head>

		<div className="container sm:m-auto p-5 md:w-10/12">
			<h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
			<p className="mb-4">
				Have questions, suggestions, or just want to say hello? We would love to hear from you!
			</p>
			<p className="mb-4">
				Uniconnect.com is dedicated to connecting farmers and consumers in the most efficient and sustainable way possible. Our mission is to support local agriculture and provide fresh, high-quality produce to your doorstep. With a team of passionate individuals committed to the well-being of both farmers and customers, we strive to create a vibrant and thriving agricultural community. Join us in our journey to make farming more accessible and enjoyable for everyone.
			</p>
			<p className="mb-4">
				You can reach us via email at <a href="mailto:contact@Uniconnect.com" className="text-blue-500">contact@Uniconnect.com</a>.
			</p>
			<p className="mb-4">
				Our office is located at:
			</p>
			<address className="mb-4 font-bold">
				123 Farm Road,<br />
				Cropville,<br />
				Greenfield County,<br />
				ZIP: 12345,<br />
				India
			</address>
			<p>
				We are open Monday to Friday from 9:00 AM to 5:00 PM. Feel free to drop by and say hi!
			</p>
		</div>
	</div>;
};

export default Contact;
