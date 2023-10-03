import { Categories } from "@/components/categories/categories";
import Companions from "@/components/companions/companions";
import SearchInput from "@/components/searchInput/searchInput";
import prismadb from "@/lib/prismadb";
import Image from "next/image";

interface RootPageProps {
	searchParams: {
		categoryId: string;
		name: string;
	};
}
export default async function RootPage({ searchParams }: RootPageProps) {
	const data = await prismadb.companion.findMany({
		where: {
			categoryId: searchParams.categoryId,
			name: {
				search: searchParams.name,
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			_count: {
				select: {
					messages: true,
				},
			},
		},
	});
	const categories = await prismadb.category.findMany();

	return (
		<div className="h-full p-4 space-y-2">
			<SearchInput />
			<Categories data={categories} />
			<Companions data={data} />
		</div>
	);
}
