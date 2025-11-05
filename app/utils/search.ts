import { FAQ, FAQWithScore } from "../types";

export function scoreMatch(query: string, text: string): number {
	const q: string = query.toLowerCase().trim();
	const t: string = text.toLowerCase().trim();
	let score: number = 0;
	if (t.includes(q)) {
		score += 10;
	}
	const words = q.split(" ");
	words.forEach((word) => {
		if (t.includes(word)) {
			score += 5;
		}
	});
	return score;
}

export function getScoredFAQ(faq: FAQ, query: string): FAQWithScore {
	return {
		...faq,
		score: scoreMatch(query, `${faq.title} ${faq.body}`),
	};
}

export function generateSummary(results: FAQ[], query: string): string {
	if (results.length === 0) {
		return `No relevant results found for "${query}". Try different keywords.`;
	}

	const sentences = results
		.slice(0, 2)
		.map((r) => r.body.split(". ")[0] + ".")
		.join(" ");

	return sentences;
}
