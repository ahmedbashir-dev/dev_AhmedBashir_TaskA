export interface FAQ {
	id: string;
	title: string;
	body: string;
}

export interface FAQWithScore extends FAQ {
	score: number;
}

export interface SearchResponse {
	results: FAQ[];
	summary: string;
	sources: string[];
	message?: string;
}

export interface ApiResponse {
	results: FAQ[];
	summary: string;
	sources: string[];
	message?: string;
}
