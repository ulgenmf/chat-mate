"use client";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { orbitron } from "@/config/font";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import MobileSidebar from "../mobileSidebar/mobileSidebar";

export default function Navbar() {
	return (
		<div className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 text-white border-b bg-noble-black-900 border-b-noble-black-400/20">
			<div className="flex items-center">
				<MobileSidebar />
				<Link href={"/"}>
					<h1
						className={
							"hidden  md:block md:text-3l text-white text-2xl font-orbitron font-bold  tracking-widest text-primary"
						}
					>
						Byte-Mate
					</h1>
				</Link>
			</div>
			<div className="flex items-end gap-x-6">
				<Button className="flex items-center gap-2" variant={"premium"} size={"sm"}>
					Upgrade
					<Sparkles className="w-4 h-4 gap-2 text-white fill-white" />
				</Button>
				<UserButton />
			</div>
		</div>
	);
}
