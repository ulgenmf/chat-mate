"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { object } from "zod";

interface ImageUploadProps {
	value: string;
	onChange: (src: string) => void;
	disabled?: boolean;
}

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return;
	}
	return (
		<div className="flex flex-col items-center justify-center w-full space-y-4">
			<CldUploadButton
				onUpload={(result: any) => onChange(result.info.secure_url)}
				options={{ maxFiles: 1 }}
				uploadPreset="zi5oe9we"
			>
				<div className="flex flex-col items-center transition rounded-l border-noble-black-900/40">
					<div className="relative w-40 h-40 rounded-lg md:h-80 md:w-80">
						<Image
							loading="eager"
							alt="upload"
							fill
							src={value || "/placeholder.svg"}
							className="object-contain duration-300 rounded-md hover:scale-105"
						/>
					</div>
				</div>
			</CldUploadButton>
		</div>
	);
};

export default ImageUpload;
