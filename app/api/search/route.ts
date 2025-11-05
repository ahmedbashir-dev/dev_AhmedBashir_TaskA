import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface FAQ {
	id: string;
	title: string;
	body: string;
}

interface FAQWithScore extends FAQ {
	score: number;
}

const faqs: FAQ[] = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), "data", "faqs.json"), "utf-8")
);

function scoreMatch(query: string, text: string): number {
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

export async function POST(request: NextRequest) {
	try {
		const { query } = await request.json();

		if (!query || typeof query !== "string" || query.trim() === "") {
			return NextResponse.json(
				{ error: "Query is required and must be a non-empty string" },
				{ status: 400 }
			);
		}

		const trimmedQuery = query.trim();

		const faqsWithScore = faqs.map((faq: FAQ) => {
			const combinedTitleAndBody = `${faq.title} ${faq.body}`;
			const currentFaqScore = scoreMatch(
				trimmedQuery,
				combinedTitleAndBody
			);
			const faqWithScore: FAQWithScore = {
				...faq,
				score: currentFaqScore,
			};
			return faqWithScore;
		});

		const relevantFaqs = faqsWithScore.filter(
			(faq: FAQWithScore) => faq.score > 0
		);

		const sortedFaqs = relevantFaqs.sort(
			(faqA: FAQWithScore, faqB: FAQWithScore) => faqB.score - faqA.score
		);

		const topFaqs = sortedFaqs.slice(0, 3);

		const results = topFaqs.map((faq) => {
			const { score, ...rest } = faq;
			return rest;
		});

		return NextResponse.json({
			results,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: `Invalid JSON or server error` },
			{ status: 400 }
		);
	}
}
