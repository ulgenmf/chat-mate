import prismadb from "@/lib/prismadb";
import React from "react";
import { Categories } from "../../../../../components/categories/categories";
import { CompanionForm } from "./components/companionForm";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
	params: {
		companionId: string;
	};
}

async function CompanionId({ params }: CompanionIdPageProps) {
	const { userId } = auth();

	if (!userId) {
		return redirectToSignIn();
	}

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
			userId,
		},
	});

	const categories = await prismadb.category.findMany();
	return <CompanionForm initialData={companion} categories={categories} />;
}

export default CompanionId;
