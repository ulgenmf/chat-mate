import React from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "../sidebar/sidebar";

function MobileSidebar() {
	return (
		<Sheet>
			<SheetTrigger className="pr-4 outline-none md:hidden">
				<Menu />
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="p-0 pt-10 text-white outline-none ring-0 bg-noble-black-900"
			>
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
}

export default MobileSidebar;
