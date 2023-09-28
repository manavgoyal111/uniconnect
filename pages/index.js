import Head from "next/head";
import Image from "next/image";

const Home = () => {
	return (
		<>
			<Head>
				<title>Uniconnect - A collaborative notes and cab sharing platform </title>
				<meta
					name="description"
					content="Uniconnect.com - Wear the Saree."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex justify-center w-auto">
				<Image
					src="/home.jpg"
					alt="Home"
					height={600}
					width={1500}
				/>
			</div>

			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
							A collaborative notes and cab sharing platform with Uniconnect.com
						</h1>
						<p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
							Explore the world of collaborative learning and efficient commuting.
						</p>
						<p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
							Uniconnect is your gateway to academic success and seamless transportation. It is where junior and senior college students come together to share knowledge, notes, and even cab rides.
						</p>
					</div>
					<div className="flex flex-wrap -m-4">
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="border border-gray-200 p-6 rounded-lg">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-6 h-6"
										viewBox="0 0 24 24"
									>
										<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
									Collaborative Learning
								</h2>
								<p className="leading-relaxed text-base">
									We are committed to fostering a culture of knowledge sharing among college students. Uniconnect.com is your gateway to collaborative learning. Explore a world of academic excellence and educational synergy.
								</p>
							</div>
						</div>
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="border border-gray-200 p-6 rounded-lg">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-6 h-6"
										viewBox="0 0 24 24"
									>
										<circle cx="6" cy="6" r="3"></circle>
										<circle cx="6" cy="18" r="3"></circle>
										<path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
									Student-Driven Excellence
								</h2>
								<p className="leading-relaxed text-base">
									Uniconnect.com is a hub where students empower students. Join us in celebrating the vibrant exchange of knowledge and notes, cultivated by your peers. Dive into the world of academic growth and camaraderie.
								</p>
							</div>
						</div>
						<div className="xl:w-1/3 md:w-1/2 p-4">
							<div className="border border-gray-200 p-6 rounded-lg">
								<div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-6 h-6"
										viewBox="0 0 24 24"
									>
										<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
										<circle cx="12" cy="7" r="4"></circle>
									</svg>
								</div>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-2">
									Academic Abundance
								</h2>
								<p className="leading-relaxed text-base">
									Uniconnect.com brings together a rich harvest of academic resources. From notes to insights, your academic journey is enriched by the bountiful offerings of our student community. Discover more.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
