"use client";

import axios from "axios";
import {
	ChevronLeft,
	Edit,
	MessagesSquare,
	MoreVertical,
	Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Companion, Message } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import BotAvatar from "../BotAvatar/botAvatar";
import { Button } from "../ui/button";

interface ChatHeaderProps {
	companion: Companion & {
		messages: Message[];
		_count: {
			messages: number;
		};
	};
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
	const router = useRouter();
	const { user } = useUser();
	const { toast } = useToast();

	const onDelete = async () => {
		try {
			await axios.delete(`/api/companion/${companion.id}`);
			toast({
				description: "Success.",
			});
			router.refresh();
			router.push("/");
		} catch (error) {
			toast({
				variant: "destructive",
				description: "Something went wrong.",
			});
		}
	};

	return (
		<div className="flex items-center justify-between w-full pb-4 border-b border-primary/10">
			<div className="flex items-center gap-x-2">
				<Button onClick={() => router.back()} size="icon" variant="ghost">
					<ChevronLeft className="w-8 h-8" />
				</Button>
				<BotAvatar src={companion.src} />
				<div className="flex flex-col gap-y-1">
					<div className="flex items-center gap-x-2">
						<p className="font-semibold font-firaCode">{companion.name}</p>
						<div className="flex items-center text-xs text-muted-foreground">
							<MessagesSquare className="w-3 h-3 mr-1" />
							{companion._count.messages}
						</div>
					</div>
					<p className="text-xs text-muted-foreground">
						Created by {companion.userName}
					</p>
				</div>
			</div>
			{user?.id === companion.userId && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="text-center duration-200 bg-transparent hover:text-stem-green-500 hover:scale-110 hover:bg-transparent"
							size="icon"
						>
							<MoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="text-white hover:bg-transparent bg-noble-black-900 bg-opacity-20"
						align="end"
					>
						<DropdownMenuItem
							onClick={() => router.push(`/companion/${companion.id}`)}
						>
							<Edit className="w-4 h-4 mr-2" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onDelete}>
							<Trash className="w-4 h-4 mr-2" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
};
export default ChatHeader;
