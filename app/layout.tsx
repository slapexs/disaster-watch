import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
	variable: "--font-prompt",
	subsets: ["thai"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Disaster watch",
	description: "เว็บนี้สร้างมาเพื่อแสดงข้อมูลภัยพิบัติทางธรรมชาติ ด้วข้อมูลของหน่วยงานรัฐ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="th" data-theme="emerald">
			<body className={prompt.className}>{children}</body>
		</html>
	);
}

