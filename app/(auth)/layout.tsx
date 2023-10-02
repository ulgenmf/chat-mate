import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center h-full bg-black">
			{children}
		</div>
	);
}

export default AuthLayout;
