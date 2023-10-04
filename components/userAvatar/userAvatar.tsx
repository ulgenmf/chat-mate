import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";

function UserAvatar() {
	const { user } = useUser();
	return (
		<div>
			<Avatar className="w-12 h-12">
				<AvatarImage src={user?.imageUrl} />
			</Avatar>
		</div>
	);
}

export default UserAvatar;
