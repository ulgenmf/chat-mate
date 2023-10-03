import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Search } from "lucide-react";

interface BotAvatarProps {
	src: string;
}
function BotAvatar({ src }: BotAvatarProps) {
	return (
		<div>
			<Avatar className="w-12 h-12">
				<AvatarImage src={src} />
			</Avatar>
		</div>
	);
}

export default BotAvatar;
