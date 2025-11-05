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
	sources: number[];
	message?: string;
}
