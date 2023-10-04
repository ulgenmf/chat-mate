"use client";
import ChatHeader from "@/components/chatComponents/chatHeader/chatHeader";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useCompletion } from "ai/react";
import ChatForm from "@/components/chatComponents/chatForm/chatForm";
import ChatMessages from "@/components/chatComponents/chatMessages/chatMessages";
import { ChatMessageProps } from "@/components/chatComponents/chatMessage/chatMessage";

interface ChatClientProps {
	companion: Companion & {
		messages: Message[];
		_count: {
			messages: number;
		};
	};
}
function ChatClient({ companion }: ChatClientProps) {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatMessageProps[]>(
		companion.messages
	);
	const { input, isLoading, handleInputChange, handleSubmit, stop, setInput } =
		useCompletion({
			api: `/api/chat/${companion.id}`,
			onFinish(prompt, completion) {
				const systemMessage = {
					role: "system",
					content: completion,
				};
				setMessages((current) => [...current, systemMessage]);
				setInput("");
				router.refresh();
			},
		});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		const userMessage = {
			role: "user",
			content: input,
		};
		setMessages((current) => [...current, userMessage]);
		setInput("");
		handleSubmit(e);
	};
	return (
		<div className="flex flex-col h-full p-4 space-y-2">
			<ChatHeader companion={companion} />
			<ChatMessages
				companion={companion}
				isLoading={isLoading}
				messages={messages}
			/>
			<ChatForm
				isLoading={isLoading}
				onSubmit={onSubmit}
				input={input}
				handleInputChange={handleInputChange}
			/>
		</div>
	);
}

export default ChatClient;
