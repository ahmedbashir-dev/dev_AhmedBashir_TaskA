"use client";

import { useState } from "react";

export default function SearchForm() {
	const [query, setQuery] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	return (
		<div className="max-w-2xl mx-auto p-6">
			<form className="flex gap-2 mb-6">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search..."
					className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
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
		</div>
	);
}
