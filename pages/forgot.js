import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");

	useEffect(() => {
		if (localStorage.getItem("token")) {
			router.push("/");
		}
	}, []);

	const handleChange = async (e) => {
		if (e.target.name == "email") {
			setEmail(e.target.value);
		} else if (e.target.name == "password") {
			setPassword(e.target.value);
		} else if (e.target.name == "cpassword") {
			setCpassword(e.target.value);
		}
	};

	const sendResetEmail = async () => {
		let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, sendMail: true }),
		});
		let res = await a.json();
		console.log(res);
		if (res.success) {
			toast.success(`Password reset instructions have been sent to your mail`, {
				position: "top-left",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error(`Error: ${res.data}`, {
				position: "top-left",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const resetPassword = async () => {
		if (password == cpassword) {
			const reqToken = router.query.resetToken;
			const reqEmail = router.query.email;
			let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: reqToken,
					password,
					email: reqEmail,
					sendMail: false,
				}),
			});
			let res = await a.json();
			if (res.success) {
				toast.success(`Password has been changed`, {
					position: "top-left",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				toast.error(`Error: ${res.data}`, {
					position: "top-left",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} else {
			toast.error(`Password did not matched`, {
				position: "top-left",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<div className="min-h-screen">
			<Head>
				<title>Forgot | Uniconnect.com</title>
			</Head>

			<ToastContainer
				position="top-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<div className="mx-auto h-12 w-auto flex justify-center">
							<Image src="/2.png" alt="Uniconnect" height={50} width={50} />
						</div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Forgot Password
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or
							<Link href="/login">
								<a className="font-medium text-green-600 hover:text-green-500">
									{" "}
									Login{" "}
								</a>
							</Link>
						</p>
					</div>
					{router.query.resetToken && (
						<div className="mt-8 space-y-6">
							<input type="hidden" name="remember" value="true" />
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="password" className="sr-only">
										New Password
									</label>
									<input
										id="password"
										name="password"
										type="password"
										required
										value={password}
										onChange={handleChange}
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
										placeholder="New Password"
									/>
								</div>
								<div>
									<label htmlFor="cpassword" className="sr-only">
										Confirm New Password
									</label>
									<input
										id="cpassword"
										name="cpassword"
										type="password"
										required
										value={cpassword}
										onChange={handleChange}
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
										placeholder="Confirm New Password"
									/>
								</div>
							</div>

							<div>
								<button
									onClick={resetPassword}
									disabled={password !== cpassword}
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
								>
									<span className="absolute left-0 inset-y-0 flex items-center pl-3">
										<svg
											className="h-5 w-5 text-green-500 group-hover:text-green-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
									Continue
								</button>
							</div>
						</div>
					)}
					{!router.query.resetToken && (
						<div className="mt-8 space-y-6">
							<input type="hidden" name="remember" value="true" />
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="email" className="sr-only">
										Email address
									</label>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={handleChange}
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
										placeholder="Email address"
									/>
								</div>
							</div>

							<div>
								<button
									onClick={sendResetEmail}
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									<span className="absolute left-0 inset-y-0 flex items-center pl-3">
										<svg
											className="h-5 w-5 text-green-500 group-hover:text-green-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
									Continue
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Forgot;
