"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Wand, Wand2 } from "lucide-react";
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
import { auth } from "@clerk/nextjs";
import { useEffect } from "react";

const formSchema = z.object({
	name: z
		.string()
		.min(3, {
			message: "Name must be at least 3 characters.",
		})
		.max(15, {
			message: "Name must be less than 15 characters.",
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
	const conversationPlaceHolder = `User: Hello, I'm eager to take steps towards financial success. I want actionable ideas to start building wealth.

AI: Hi, that's a great goal! Let's dive right in. Firstly, assess your current financial situation. Calculate your net worth, including assets and liabilities. This will give you a clear picture to work from.

User: Okay, I've done that. What's next?

AI: Consider setting up a "pay yourself first" system. Automatically transfer a portion of your income into a dedicated savings or investment account as soon as you get paid. This ensures you're consistently saving or investing without thinking about it.

User: How much should I save or invest from each paycheck?

AI: Aim to save or invest at least 20% of your income. If you can, increase this percentage over time as your income grows. This disciplined approach will help you build wealth steadily.`;

	const instructionsPlaceHolder =
		'"You are a seasoned financial expert, and your mission is to provide valuable advice to help individuals achieve financial success. Your expertise covers a wide range of financial topics, including investments, budgeting, saving, and wealth management. Your explanations should be comprehensive, yet easily digestible, catering to both beginners and experienced individuals seeking financial guidance. Your approach is to make complex financial concepts accessible, fostering an environment where people can make informed decisions to enhance their financial well-being. Please provide instructions for your AI model to generate insightful financial advice"';

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (initialData) {
				await axios.patch(`/api/companion/${initialData.id}`, values);
			} else {
				await axios.post("/api/companion", values);
			}
			toast({
				description: "Success.",
			});
			router.refresh();
			router.push("/");
		} catch (error) {
			toast({
				variant: "destructive",
				description: `${error} Something went wrong`,
			});
		}
	};

	return (
		<div className="h-full max-w-3xl p-4 mx-auto space-y-2">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="pb-10 space-y-8">
					<div className="w-full col-span-2 space-y-2">
						<div>
							<h3 className="text-lg font-medium text-white font-firaCode">
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
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel className="text-white font-jakarta">Name</FormLabel>
									<FormControl>
										<Input
											className="border-none bg-noble-black-900/40 "
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
											className="border-none bg-noble-black-900/40 "
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
											<SelectTrigger className="text-white bg-noble-black-900/40">
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent className="text-white border-none bg-noble-black-900/90 focus:border-none font-jakarta">
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
					<div className="w-full space-y-2">
						<div className="">
							<h3 className="text-lg font-medium text-white font-firaCode">
								Configuration
							</h3>
							<p className="text-sm text-muted-foreground">Detailed Instructions</p>
							<Separator className="mt-2 bg-noble-black-500/90" />
						</div>
						<FormField
							name="instructions"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel className="text-white font-jakarta">Instructions</FormLabel>
									<FormControl>
										<Textarea
											className="h-40 resize-none bg-noble-black-900/40 text-noble-black-200"
											disabled={isLoading}
											placeholder={instructionsPlaceHolder}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Please give detailed instructions for your AI companion. Minimum{" "}
										<span className="font-bold text-noble-black-300">200</span>{" "}
										characters.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>{" "}
						<FormField
							name="seed"
							control={form.control}
							render={({ field }) => (
								<FormItem className="col-span-2 md:col-span-1">
									<FormLabel className="text-white font-jakarta">
										Example Conversation
									</FormLabel>
									<FormControl>
										<Textarea
											className="h-40 resize-none bg-noble-black-900/40 text-noble-black-200"
											disabled={isLoading}
											placeholder={conversationPlaceHolder}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Please provide an example conversation.
										<span className="ml-1 text-bold text-noble-black-200">
											You dont have to type User/AI but you can simply put a &apos; -
											&apos; (dash) instead before each new message. Make sure you start
											with User&apos;s message.
										</span>
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex justify-center w-full">
						<Button disabled={isLoading} className="flex items-center" size={"lg"}>
							{initialData ? "Edit Companion" : "Create Companion"}
							<Wand className="w-4 h-4 ml-2 " />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
