import "./globals.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import type { Metadata } from "next";
import { inter, orbitron, jakarta, roboto, firaCode } from "@/config/font";
import { MemoryManager } from "@/lib/memory";
import TestElement from "@/components/textElements/test";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

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
	console.log(
		"aaaXXXXXXXXXXXXXXXXXXXXXaaaaaaaaaaaaaaaaa!!!!!!!!!!!!!aaaaaaaaaaaaaaa1111111111111111111111111111111111222222222222222222222222222222222222222233333333333333333333"
	);

	const userId = auth();
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={cn(
						"",
						`   ${inter.variable} ${firaCode.variable} ${orbitron.variable} ${jakarta.variable} ${roboto.variable}`
					)}
				>
					{/* <TestElement /> */} <Analytics />
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
