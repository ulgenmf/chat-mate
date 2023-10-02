import Navbar from "@/components/navbar/navbar";
import React from "react";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full">
			<Navbar />
			<main className={`h-full bg-noble-black-500 pt-16 md:pl-20 `}>
				{children}
			</main>
		</div>
	);
}
