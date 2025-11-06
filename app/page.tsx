import SearchForm from "./components/SearchForm";

export default function Home() {
	return (
		<main className="min-h-screen bg-gray-50 py-12">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">
					Mini Search
				</h1>
			</div>
			<SearchForm />
		</main>
	);
}
