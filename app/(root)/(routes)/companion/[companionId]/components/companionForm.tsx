"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";
import { Category, Companion } from "@prisma/client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectTrigger,
} from "@/components/ui/select";
import ImageUpload from "@/components/imageUploader/imageUpload";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Name is required.",
	}),
	description: z.string().min(1, {
		message: "Description is required.",
	}),
	instructions: z.string().min(200, {
		message: "Instructions require at least 200 characters.",
	}),
	seed: z.string().min(200, {
		message: "Seed requires at least 200 characters.",
	}),
	src: z.string().min(1, {
		message: "Image is required.",
	}),
	categoryId: z.string().min(1, {
		message: "Category is required",
	}),
});

interface CompanionFormProps {
	categories: Category[];
	initialData: Companion | null;
}

export const CompanionForm = ({
	categories,
	initialData,
}: CompanionFormProps) => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			description: "",
			instructions: "",
			seed: "",
			src: "",
			categoryId: undefined,
		},
	});

	const instructionsPlaceHolder =
		'"You are a seasoned financial expert, and your mission is to provide valuable advice to help individuals achieve financial success. Your expertise covers a wide range of financial topics, including investments, budgeting, saving, and wealth management. Your explanations should be comprehensive, yet easily digestible, catering to both beginners and experienced individuals seeking financial guidance. Your approach is to make complex financial concepts accessible, fostering an environment where people can make informed decisions to enhance their financial well-being. Please provide instructions for your AI model to generate insightful financial advice"';

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<div className="h-full max-w-3xl p-4 mx-auto space-y-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="pb-10 space-y-8">
					<div className="w-full col-span-2 space-y-2">
						<div>
							<h3 className="text-lg text-white font-firaCode font-medium">
								General Information
							</h3>
							<p className="text-sm text-muted-foreground">
								General information about your Companion
							</p>
						</div>
						<Separator className="bg-noble-black-500/90" />
					</div>
					<FormField
						name="src"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center justify-center col-span-2 space-y-4">
								<FormControl>
									<ImageUpload
										disabled={isLoading}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1  gap-4 md:grid-cols-2">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel className="text-white font-jakarta">Name</FormLabel>
									<FormControl>
										<Input
											className="bg-noble-black-900/40 border-none "
											disabled={isLoading}
											placeholder="My AI Friend"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is how your AI Companion will be named.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-white font-jakarta">Description</FormLabel>
									<FormControl>
										<Input
											className="bg-noble-black-900/40 border-none "
											disabled={isLoading}
											placeholder="Helpfull AI Assistant"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Short description for your AI Companion
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-white font-jakarta">Category</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-noble-black-900/40 text-white">
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-noble-black-900/90 focus:border-none border-none font-jakarta text-white">
											{categories.map((category) => (
												<SelectItem
													className="border-none"
													key={category.id}
													value={category.id}
												>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>Select a category for your AI</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-2 w-full">
						<div className="">
							<h3 className="text-lg font-medium font-firaCode text-white">
								Configuration
							</h3>
							<p className="text-muted-foreground">Detailed Instructions</p>
							<Separator className="bg-noble-black-500/90 mt-2" />
						</div>
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel className="text-white font-jakarta">Instructions</FormLabel>
									<FormControl>
										<Textarea
											className="bg-noble-black-900/40 outline-none text-noble-black-200 resize-none border-none "
											disabled={isLoading}
											placeholder={instructionsPlaceHolder}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is how your AI Companion will be named.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
};
