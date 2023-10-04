import BotAvatar from "@/components/BotAvatar/botAvatar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RiseLoader } from "react-spinners";
import React, { useState } from "react";
import ColorChangingLoader from "@/components/colorChangingLoader";
import UserAvatar from "@/components/userAvatar/userAvatar";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
export interface ChatMessageProps {
	role: "user" | "system";
	content?: string;

	isLoading: boolean;
	src?: string;
}
function ChatMessage({ role, content, isLoading, src }: ChatMessageProps) {
	const { toast } = useToast();

	function onCopy() {
		if (!content) {
			return;
		}
		navigator.clipboard.writeText(content);

		toast({
			description: "Message copied to clipboard",
			duration: 1000,
		});
	}

	return (
		<div
			className={cn(
				"group flex items-start gap-x-3  w-full border-noble-black-900",
				role === "user" && "justify-end"
			)}
		>
			{role !== "user" && src && <BotAvatar src={src} />}
			<div
				className={cn(
					"max-w-sm px-4 py-4 text-sm bg-transparent rounded-md border-noble-black-900 font-jakarta text-stem-green-500",
					!isLoading && "border-b-2"
				)}
			>
				{isLoading ? <ColorChangingLoader /> : content}
			</div>
			{role === "user" && src && <UserAvatar />}
			{role === "system" && !isLoading && (
				<div>
					<Button
						onClick={onCopy}
						size="icon"
						className="justify-center bg-transparent opacity-30 active:text-green-500 group-hover:opacity-100"
					>
						<CopyIcon className="w-2 h-2 duration-200 active:text-green-500 group-hover:h-5 group-hover:w-5" />
					</Button>
				</div>
			)}
		</div>
	);
}

export default ChatMessage;
