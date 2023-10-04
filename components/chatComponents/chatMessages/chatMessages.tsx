import { Companion } from "@prisma/client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage, {
	ChatMessageProps,
} from "@/components/chatComponents/chatMessage/chatMessage";
interface ChatMessagesProps {
	isLoading: boolean;
	messages: ChatMessageProps[];
	companion: Companion;
}
function ChatMessages({ isLoading, messages, companion }: ChatMessagesProps) {
	const scrollRef = useRef<ElementRef<"div">>(null);
	const [fakeLoading, setFakeLoading] = useState(
		messages.length === 0 ? true : false
	);

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
	});

	useEffect(() => {
		const timeout = setTimeout(() => setFakeLoading(false), 1000);

		return () => clearTimeout(timeout);
	});
	return (
		<div className="flex-1 pr-4 overflow-y-auto">
			<ChatMessage
				role={"system"}
				content={
					"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio fuga impedit ducimus nihil facere dignissimos voluptates possimus quidem necessitatibus corporis ullam, at commodi officiis, et temporibus vel aperiam non quos."
				}
				isLoading={fakeLoading}
				src={companion.src}
			/>
			{messages.map((msg) => (
				<ChatMessage
					role={msg.role}
					isLoading={fakeLoading}
					key={msg.content}
					content={msg.content}
				/>
			))}
			{isLoading && <ChatMessage role={"system"} src={companion.src} isLoading />}
			<div ref={scrollRef} />
		</div>
	);
}

export default ChatMessages;
