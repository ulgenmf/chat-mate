import React from "react";
import { Button } from "../ui/button";

function TestElement() {
	return (
		<div className="fixed flex items-center justify-center gap-5 p-2 bg-red-200 top-72 bg-opacity-40 ">
			<Button className="" variant={"primary"}>
				Button
			</Button>
			<Button variant={"destructive"}>a</Button>
			<Button variant={"ghost"}>a</Button>
			<Button variant={"secondary"}>a</Button>
			<Button variant={"link"}>a</Button>
			<Button variant={"outline"}>a</Button>
			<Button variant={"premium"}>a</Button>
		</div>
	);
}

export default TestElement;
