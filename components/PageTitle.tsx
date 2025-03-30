import { IPageTitle } from "@/types/pageTitle";
import React from "react";

const PageTitle = ({ title, description }: IPageTitle) => {
	return (
		<>
			<main className="sticky top-0 z-20 bg-base-100 shadow-md p-4">
				<h1 className="text-3xl font-semibold">{title}</h1>
				{description && <p className="font-light">{description}</p>}
			</main>
		</>
	);
};

export default PageTitle;

