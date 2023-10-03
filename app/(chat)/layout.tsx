import React from "react";

function ChatLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-full max-w-4xl mx-auto text-white">{children}</div>
	);
}

export default ChatLayout;
