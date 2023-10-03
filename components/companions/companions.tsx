import Image from "next/image";
import Link from "next/link";
import { Companion } from "@prisma/client";
import { MessagesSquare } from "lucide-react";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

interface CompanionsProps {
	data: (Companion & {
		_count: {
			messages: number;
		};
	})[];
}

const Companions = ({ data }: CompanionsProps) => {
	if (data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center pt-10 space-y-3">
				<div className="relative w-60 h-60">
					<Image fill className="" src="/cant-find.gif" alt="Empty" />
				</div>
				<p className="text-sm text-muted-foreground">No companions found.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
			{data.map((item) => (
				<Card
					key={item.name}
					className="transition border-0 cursor-pointer bg-primary/80 rounded-xl hover:opacity-75"
				>
					<Link href={`/chat/${item.id}`}>
						<CardHeader className="flex items-center justify-center text-center text-muted-foreground">
							<div className="relative rounded-lg">
								<Image
									src={item.src}
									height={240}
									width={240}
									className=" rounded-xl"
									alt="Character"
								/>
							</div>
							<p className="font-bold">{item.name}</p>
							<p className="text-xs">{item.description}</p>
						</CardHeader>
						<CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
							<p className="lowercase">@{item.userName}</p>
							<div className="flex items-center">
								<MessagesSquare className="w-3 h-3 mr-1" />
								{item._count.messages}
							</div>
						</CardFooter>
					</Link>
				</Card>
			))}
		</div>
	);
};
export default Companions;
