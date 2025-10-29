export type TYearBlock = {
	year: number;
	items: {
		title: string;
		subtitle?: string;
		location?: string;
		description?: string;
		fullText?: string;
		type: 'education' | 'internship' | 'job';
		clickable?: boolean;
		link?: string;
		tech?: string[];
	}[];
};

export type TProject = {
	id: string | number;
	title: string;
	date?: string;
	description?: string;
	fullDescription?: string;
	technologies?: string[];
	images?: string[];
	link?: string;
};
