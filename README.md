# Hero score

In the repo you'll find a TS project running the serverless framework. 

I chose zod to handle request payloads and types, node-fetch for the fetching and Big.js to handle number precision. Considered using something like `lossless-json` when parsing the hero score in the request body, but felt uncessary at the 0-100 range.

The csv file output can be found at `./score.csv`. Would have attempted something more involved like writing to S3, but ran out of time :D

The application uses serverless-offline, to spin it up run `npm install` & `npm run dev`. This will make the endpoint available at `http://localhost:4500/local/api/score`. There's a postman collectiont to hit if you like.

