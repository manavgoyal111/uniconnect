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

		<section className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
				<div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
					<iframe width="100%" height="100%" className="absolute inset-0" frameBorder="0" title="map" marginHeight="0" marginWidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0473525836474!2d79.14084817354677!3d12.968821814942293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad476d55051903%3A0xc7f6b9a2dbfc4c27!2s3%2C%20VIT%20Main%20Rd%2C%20Old%20Katpadi%2C%20Vaibhav%20Nagar%2C%20Katpadi%2C%20Vellore%2C%20Tamil%20Nadu%20632014!5e0!3m2!1sen!2sin!4v1695962911776!5m2!1sen!2sin" style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4);" }}></iframe>
					<div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
						<div className="lg:w-1/2 px-6">
							<h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
							<p className="mt-1">123 Farm Road,
								Cropville,
								Greenfield County,
								ZIP: 12345,
								India</p>
						</div>
						<div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
							<h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
							<a className="text-indigo-500 leading-relaxed">contact@uniconnect.com</a>
							<h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
							<p className="leading-relaxed">123-456-7890</p>
						</div>
					</div>
				</div>

				<div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
					<h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
					<p className="leading-relaxed mb-5 text-gray-600">We are open Monday to Friday from 9:00 AM to 5:00 PM. Feel free to drop by and say hi!</p>
					<div className="relative mb-4">
						<label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
						<input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
					</div>
					<div className="relative mb-4">
						<label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
						<input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
					</div>
					<div className="relative mb-4">
						<label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
						<textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
					</div>
					<button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
					<p className="text-xs text-gray-500 mt-3">Have questions, suggestions, or just want to say hello? We would love to hear from you!</p>
				</div>
			</div>
		</section>
	</div>;
};

export default Contact;
