import Link from "next/link";

const Footer = () => {
	return (
		<footer className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
				<div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
					<Link href="/">
						<a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
							<span className="ml-3 text-xl text-green-500">
								{/* <Image src="/3.png" alt="Home" height={40} width={200} /> */}
								Uniconnect
							</span>
						</a>
					</Link>
					<p className="mt-2 text-sm text-gray-500 px-4">A collaborative notes and cab sharing platform </p>
				</div>
				<div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
					<div className="lg:w-1/3 md:w-1/2 w-full px-4">
						<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
							SHOP
						</h2>
						<nav className="list-none mb-10">
							<li>
								<Link href="/notes">
									<a className="text-gray-600 hover:text-gray-800">
										Notes
									</a>
								</Link>
							</li>
							<li>
								<Link href="/cabs">
									<a className="text-gray-600 hover:text-gray-800">
										Cabs
									</a>
								</Link>
							</li>
							<li>
								<Link href="/products">
									<a className="text-gray-600 hover:text-gray-800">
										Products
									</a>
								</Link>
							</li>
							<li>
								<Link href="/cabs">
									<a className="text-gray-600 hover:text-gray-800">
										Cabs
									</a>
								</Link>
							</li>
						</nav>
					</div>
					<div className="lg:w-1/3 md:w-1/2 w-full px-4">
						<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
							ABOUT
						</h2>
						<nav className="list-none mb-10">
							<li>
								<Link href="/contact">
									<a className="text-gray-600 hover:text-gray-800">Contact</a>
								</Link>
							</li>
							<li>
								<Link href="/about">
									<a className="text-gray-600 hover:text-gray-800">About Us</a>
								</Link>
							</li>
							<li>
								<Link href="/track">
									<a className="text-gray-600 hover:text-gray-800">Shipping</a>
								</Link>
							</li>
							<li>
								<Link href="#">
									<a className="text-gray-600 hover:text-gray-800">FAQ</a>
								</Link>
							</li>
						</nav>
					</div>
					<div className="lg:w-1/3 md:w-1/2 w-full px-4">
						<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
							POLICY
						</h2>
						<nav className="list-none mb-10">
							<li>
								<Link href="#">
									<a className="text-gray-600 hover:text-gray-800">Return Policy</a>
								</Link>
							</li>
							<li>
								<Link href="#">
									<a className="text-gray-600 hover:text-gray-800">Terms Of Use</a>
								</Link>
							</li>
							<li>
								<Link href="#">
									<a className="text-gray-600 hover:text-gray-800">Security</a>
								</Link>
							</li>
							<li>
								<Link href="#">
									<a className="text-gray-600 hover:text-gray-800">Privacy</a>
								</Link>
							</li>
						</nav>
					</div>
				</div>
			</div>
			<div className="bg-gray-100">
				<div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
					<p className="text-gray-500 text-sm text-center sm:text-left">
						© 2023 Uniconnect.com — All Rights Reserved
					</p>
					<span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
						<a className="text-gray-500" href="https://github.com/manavgoyal111" target="_blank" rel="noreferrer">
							<svg fill="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-4 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
						</a>
						<a className="ml-3 text-gray-500" href="https://twitter.com/manav_goyal1" target="_blank" rel="noreferrer">
							<svg
								fill="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-5 h-5"
								viewBox="0 0 24 24"
							>
								<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
							</svg>
						</a>
						<a className="ml-3 text-gray-500" href="https://www.instagram.com/manavgoyal111/" target="_blank" rel="noreferrer">
							<svg
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-5 h-5"
								viewBox="0 0 24 24"
							>
								<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
								<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
							</svg>
						</a>
						<a className="ml-3 text-gray-500" href="https://www.linkedin.com/in/manav-goyal" target="_blank" rel="noreferrer">
							<svg
								fill="currentColor"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="0"
								className="w-5 h-5"
								viewBox="0 0 24 24"
							>
								<path
									stroke="none"
									d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
								></path>
								<circle cx="4" cy="4" r="2" stroke="none"></circle>
							</svg>
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
