import React from "react";
import { useApp } from "../context/AppContext.jsx";

const Profile = () => {
	const { user, logout } = useApp();
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow text-center w-full max-w-md">
				<h1 className="text-2xl font-bold mb-4">Profile</h1>
				{user ? (
					<>
						<div className="mb-4">
							<div className="text-lg font-semibold">{user.firstName} {user.lastName}</div>
							<div className="text-gray-600">Phone: {user.phone}</div>
							<div className="text-gray-600">Balance: ₹{user.balance}</div>
						</div>
						<button
							className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
							onClick={logout}
						>
							Logout
						</button>
					</>
				) : (
					<div className="text-gray-600">No user logged in.</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
