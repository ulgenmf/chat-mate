import {
	Fira_Code,
	Inter,
  Orbitron,
  Roboto,
	Plus_Jakarta_Sans,
} from "next/font/google";

export const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});
export const roboto = Roboto({
  subsets: ["latin"],
  weight:['400','100'],
	variable: "--font-roboto",
});

export const FiraCode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-mono",
});
export const orbitron = Orbitron({
	subsets: ["latin"],
	variable: "--font-orbitron",
  weight: ["400", '500','600'],
});
export const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-jakarta",
	weight: ['400','700','800','500'],
});
