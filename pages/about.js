import Head from "next/head";

const About = () => {
	return <div className="min-h-screen">
		<Head>
			<meta
				name="description"
				content="Uniconnect.com - About information"
			/>
			<title>About | Uniconnect.com</title>
		</Head>

		<div className="container sm:m-auto p-10 md:w-10/12">
			<h1 className="text-3xl font-semibold mb-4">About Uniconnect</h1>
			<p className="mb-4">
				Uniconnect.com is not just an online platform; it is a community-driven initiative dedicated to bridging the gap between students and promoting sustainable commuting. Our mission is to make college life easier and more eco-friendly by facilitating collaborative note-sharing and efficient cab coordination.
			</p>
			<p className="mb-4">
				Whether you are a junior seeking academic support or a senior eager to help your fellow students, Uniconnect.com is your go-to platform. We are committed to fostering a sense of community, mentorship, and environmental consciousness among the student population.
			</p>
			<p className="mb-4">
				Have questions, suggestions, or just want to connect? We would love to hear from you! Reach out to us via email at <a href="mailto:contact@Uniconnect.com" className="text-blue-500">contact@Uniconnect.com</a>.
			</p>
		</div>
	</div>;
};

export default About;
