"use client";
import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
	const pathName = usePathname();
	const router = useRouter();
	const routes = [
		{
			icon: Home,
			label: "Home",
			href: "/",
			pro: false,
		},
		{
			icon: Plus,
			label: "Create",
			href: "/companion/new",
			pro: true,
		},
		{
			icon: Settings,
			label: "Settings",
			href: "/settings",
			pro: false,
		},
	];
	const onNavigate = (url: string, pro: boolean) => {
		return router.push(url);
	};
	return (
		<div className="flex flex-col h-full space-y-5 bg-noble-black-900">
			<div className="justify-center flex-1 p-2 ">
				<div className="space-y-2">
					{routes.map((route) => (
						<div
							onClick={() => onNavigate(route.href, route.pro)}
							className={cn(
								"text-muted-foreground items-center text-center text-xs justify-start p-3 group flex  flex-col spacefont-medium font font-jakarta rounded-lg cursor-pointer hover:bg-slate-50/10 transition",
								pathName === route.href && "bg-slate-50/10 text-stem-green-500 "
							)}
							key={route.href}
						>
							<div className="flex flex-col items-center justify-center flex-1 rounded-lg gap-y-2">
								<route.icon className="w-5 h-" />
								{route.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
