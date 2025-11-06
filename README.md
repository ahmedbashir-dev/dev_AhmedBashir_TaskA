# Mini Search Full-Stack App

A minimal search interface that queries a local JSON dataset via a POST request to `/api/search` endpoint.

## Features

-   Next.js 16 (App Router)
-   TypeScript
-   Local `faqs.json` dataset
-   Keyword-based relevance scoring
-   Top 3 results with title + snippet
-   Loading, empty, and error states
-   Bonus: Summary + source IDs

## Setup Instructions

1. Clone the repo
```
git clone [https://github.com/ahmedbashir-dev/dev_AhmedBashir_TaskA](https://github.com/ahmedbashir-dev/dev_AhmedBashir_TaskA.git)
```
2. Install Dependencies
```
npm install
```
3. Run the development server
```
npm run dev
```


Open http://localhost:3000

## Project Structure
```
├── app
│   ├── api
│   │   └── search
│   │       └── route.ts
│   ├── components
│   │   └── SearchForm.tsx
│   ├── lib
│   │   └── db.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── search.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── data
│   └── faqs.json
├── public
├── .gitignore
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## API Endpoint

### POST `/api/search`

This endpoint accepts a search query string and returns the most relevant FAQ entries from a local dataset.
It computes similarity scores using a custom text matching algorithm, sorts results by relevance, and optionally includes a short combined summary of top results.

### Request Body

| Field   | Type     | Required | Description                                          |
| ------- | -------- | -------- | ---------------------------------------------------- |
| `query` | `string` | true     | The user’s search input. Must be a non-empty string. |

**Example Request Payload**

```json
{
	"query": "trust"
}
```

### Response

**200 OK**

Returns the top 3 most relevant FAQ entries, a generated summary, and a list of source IDs.
| Field | Type | Description |
| --------- | --------------------- | ------------------------------------------------------------------------------------ |
| `results` | `Array<FAQ>` | List of the top matching FAQ objects. |
| `summary` | `string` | A 2–3 sentence combined summary of the top results |
| `sources` | `string[]` | IDs of the FAQs included in the response. |
| `message` | `string` _(optional)_ | Returned only if no matches are found. |

**Example Response**

```json
{
	"results": [
		{
			"id": "1",
			"title": "Trust badges near CTA",
			"body": "Adding trust badges near the primary CTA increased signups by 12%."
		},
		{
			"id": "2",
			"title": "Above-the-fold form",
			"body": "Visible form above the fold lifted lead submissions by 9%."
		},
		{
			"id": "3",
			"title": "Qualifying question",
			"body": "A single qualifying question improved demo attendance by 6%."
		}
	],
	"summary": "Adding trust badges near the primary CTA increased signups by 12%.. Visible form above the fold lifted lead submissions by 9%..",
	"sources": ["1", "2", "3"]
}
```

**400 Bad Request**

Returned when the request JSON is invalid or the `query` is empty.

**Example**

```json
{
	"error": "Query is required and must be a non-empty string"
}
```
