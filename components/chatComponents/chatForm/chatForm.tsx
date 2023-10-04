import React from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ghost, SendHorizontal } from "lucide-react";
interface ChatFormProps {
	input: string;
	handleInputChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	isLoading: boolean;
	onSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		chatRequestOptions?: ChatRequestOptions | undefined
	) => void;
}
function ChatForm({
	input,
	handleInputChange,
	isLoading,
	onSubmit,
}: ChatFormProps) {
	return (
		<form
			onSubmit={onSubmit}
			className="flex items-center py-4 border-t border-noble-black-400 gap-x-2"
		>
			<Input
				disabled={isLoading}
				value={input}
				onChange={handleInputChange}
				placeholder="Type message"
				className="border-none rounded-lg bg-noble-black-900"
			/>
			<Button disabled={isLoading} variant={"ghost"}>
				<SendHorizontal className="w-6 h-6" />
			</Button>
		</form>
	);
}

export default ChatForm;
