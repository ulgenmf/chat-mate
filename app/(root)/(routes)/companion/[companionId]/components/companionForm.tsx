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
							<h3 className="text-lg font-medium">General Information</h3>
							<p className="text-sm text-muted-foreground">
								General information about your Companion
							</p>
						</div>
						<Separator className="bg-primary/10" />
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
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={isLoading} placeholder="Elon Musk" {...field} />
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
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="CEO & Founder of Tesla, SpaceX"
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
									<FormLabel>Category</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-background">
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
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
						<div>
							<h3 className="text-lg font-medium">Configuration</h3>
							<p className="text-sm text-muted-foreground">
								Detailed instructions for AI Behaviour
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</div>
					<FormField
						name="instructions"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Instructions</FormLabel>
								<FormControl>
									<Textarea
										disabled={isLoading}
										rows={7}
										className="resize-none bg-background"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Describe in detail your companion&apos;s backstory and relevant
									details.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="seed"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Example Conversation</FormLabel>
								<FormControl>
									<Textarea
										disabled={isLoading}
										rows={7}
										className="resize-none bg-background"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Write couple of examples of a human chatting with your AI companion,
									write expected answers.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-center w-full">
						<Button size="lg" disabled={isLoading}>
							{initialData ? "Edit your companion" : "Create your companion"}
							<Wand2 className="w-4 h-4 ml-2" />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
