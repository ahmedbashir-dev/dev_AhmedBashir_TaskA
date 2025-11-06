"use client";

import { useState } from "react";
import { ApiResponse } from "../types";
import { truncate } from "../utils/search";

export default function SearchForm() {
	const [query, setQuery] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<ApiResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		if (!query.trim()) {
			setError("Please enter a search query.");
			return;
		}

		setLoading(true);
		setError(null);
		setData(null);

		try {
			const res = await fetch("/api/search", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query }),
			});

			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.error || "Search failed");
			}

			const result = await res.json();
			setData(result);
		} catch (err) {
			if (err instanceof Error) setError(err.message);
			else setError("An unknown error occurred");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<form onSubmit={handleSearch} className="flex gap-2 mb-6">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search..."
					className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-50  focus:ring-blue-500"
					disabled={loading}
				/>
				<button
					type="submit"
					disabled={loading || !query.trim()}
					className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
				>
					{loading ? "Searching..." : "Search"}
				</button>
			</form>

			{loading && (
				<div className="text-center text-gray-600">
					Loading results...
				</div>
			)}

			{error && (
				<div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
					{error}
				</div>
			)}

			{data && !loading && (
				<div className="space-y-6">
					{data.results.length !== 0 && data.summary && (
						<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm italic text-blue-800">
							<strong>Summary:</strong> {data.summary}
							{data.sources.length > 0 && (
								<span className="block mt-1 text-xs">
									Sources: {data.sources.join(", ")}
								</span>
							)}
						</div>
					)}

					{data.results.length === 0 ? (
						<p className="text-center text-gray-500">
							{data.message}
						</p>
					) : (
						<div className="space-y-4">
							{data.results.map((item) => (
								<div
									key={item.id}
									className="p-4 border rounded-lg bg-white shadow-sm"
								>
									<h3 className="font-semibold text-lg text-gray-800">
										{item.title}
									</h3>
									<p className="text-gray-600 mt-1">
										{truncate(item.body)}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
