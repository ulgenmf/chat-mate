import { Companion } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage, {
	ChatMessageProps,
} from "@/components/chatComponents/chatMessage/chatMessage";
import prismadb from "@/lib/prismadb";
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
				isLoading={fakeLoading}
				src={companion.src}
				role="system"
				content={`Hello, I am ${companion.name}, ${companion.description}`}
			/>
			{messages.map((message, idx) => (
				<ChatMessage
					key={uuidv4()}
					src={companion.src}
					content={message.content}
					role={message.role}
				/>
			))}

			{isLoading && <ChatMessage src={companion.src} role="system" isLoading />}
			<div ref={scrollRef} />
		</div>
	);
}

export default ChatMessages;
