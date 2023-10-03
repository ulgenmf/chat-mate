import "./globals.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import type { Metadata } from "next";
import { inter, orbitron, jakarta, roboto, firaCode } from "@/config/font";

import TestElement from "@/components/textElements/test";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userId = auth();
	console.log(userId.userId);
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						"",
						`   ${inter.variable} ${firaCode.variable} ${orbitron.variable} ${jakarta.variable} ${roboto.variable}`
					)}
				>
					{/* <TestElement /> */}
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
