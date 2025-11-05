import { NextRequest, NextResponse } from "next/server";
import { FAQ, FAQWithScore, SearchResponse } from "@/app/types";
import { getFAQs } from "@/app/lib/db";
import { generateSummary, getScoredFAQ } from "@/app/utils/search";

const MAX_RESULTS = 3;

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
		const faqs = getFAQs();

		const faqsWithScore = faqs.map((faq: FAQ) => {
			return getScoredFAQ(faq, trimmedQuery);
		});

		const relevantFaqs = faqsWithScore.filter(
			(faq: FAQWithScore) => faq.score > 0
		);

		const sortedFaqs = relevantFaqs.sort(
			(faqA: FAQWithScore, faqB: FAQWithScore) => faqB.score - faqA.score
		);

		const topFaqs = sortedFaqs.slice(0, MAX_RESULTS);

		const results = topFaqs.map((faq) => {
			const { score, ...rest } = faq;
			return rest;
		});

		const ids = results.map((result) => result.id);
		const summary = generateSummary(results, trimmedQuery);

		const response: SearchResponse = {
			results,
			summary,
			sources: ids,
			...(results.length === 0 && { message: "No matches found." }),
		};

		return NextResponse.json({
			response,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: `Invalid JSON or server error` },
			{ status: 400 }
		);
	}
}
