import prismadb from "@/lib/prismadb";
import React from "react";
import { Categories } from "../../../../../components/categories/categories";
import CompanionForm from "./components/companionForm";

interface CompanionIdPageProps {
	params: {
		companionId: string;
	};
}

async function CompanionId({ params }: CompanionIdPageProps) {
	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
		},
	});

	const categories = await prismadb.category.findMany();
	return <CompanionForm initalData={companion} categories={categories} />;
}

export default CompanionId;
