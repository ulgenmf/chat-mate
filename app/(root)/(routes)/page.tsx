import { Categories } from "@/components/categories/categories";
import SearchInput from "@/components/searchInput/searchInput";
import prismadb from "@/lib/prismadb";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
	const categories = await prismadb.category.findMany();

	return (
		<div className="h-full p-4 space-y-2">
			<SearchInput />
			<Categories data={categories} />
		</div>
	);
}
