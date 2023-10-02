"use client";
import qs from "query-string";
import { Search } from "lucide-react";
import React, {
	ChangeEventHandler,
	HtmlHTMLAttributes,
	useEffect,
	useState,
} from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

function SearchInput() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const categoryId = searchParams.get("categoryId");
	const name = searchParams.get("name");
	const [value, setValue] = useState(name || "");
	const deBounceValue = useDebounce<string>(value, 500);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		const query = {
			name: deBounceValue,
			categoryId: categoryId,
		};
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipEmptyString: true, skipNull: true }
		);
		router.push(url);
	}, [deBounceValue, router, categoryId]);

	return (
		<div className="relative">
			<Search className="absolute w-4 h-4 top-3 left-4 text-muted-foreground" />
			<Input
				onChange={onChange}
				value={value}
				className="pl-10 border-none outline-none bg-noble-black-900/10 ring-0"
				placeholder="Search..."
			/>
		</div>
	);
}

export default SearchInput;
