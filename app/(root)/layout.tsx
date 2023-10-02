import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full">
			<Navbar />
			<div className="fixed inset-y-0 flex-col hidden w-20 mt-16 md:flex">
				<Sidebar />
			</div>
			<main className={`h-full bg-noble-black-600 pt-16 md:pl-20 `}>
				{children}
			</main>
		</div>
	);
}
