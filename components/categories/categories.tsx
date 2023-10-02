"use client";

import qs from "query-string";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoriesProps {
	data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const categoryId = searchParams.get("categoryId");

	const onClick = (id: string | undefined) => {
		const query = { categoryId: id };

		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{ skipNull: true }
		);

		router.push(url);
	};

	return (
		<div className="flex w-full p-1 space-x-2 overflow-x-auto">
			<button
				onClick={() => onClick(undefined)}
				className={cn(
					`
              flex
            items-center
            text-center
            text-xs
            md:text-sm
            px-2
            md:px-4
            py-2
            md:py-3
            rounded-md
						text-white
						font-jakarta
duration-300
            bg-primary/10
            hover:opacity-20
            transition
        `,
					!categoryId
						? "bg-slate-50/10 text-stem-green-500 hover:opacity-100 duration-300"
						: "bg-primary/10"
				)}
			>
				Newest
			</button>
			{data.map((item) => (
				<button
					onClick={() => onClick(item.id)}
					className={cn(
						`
            flex
            items-center
            text-center
            text-xs
            md:text-sm
            px-2
            md:px-4
            py-2
            md:py-3
            rounded-md
						text-white
						font-jakarta
duration-300
            bg-primary/10
            hover:opacity-20
            transition
          `,
						item.id === categoryId
							? "bg-slate-50/10 text-stem-green-500 hover:opacity-100 duration-300"
							: "bg-primary/10"
					)}
					key={item.id}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
