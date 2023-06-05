1. Build the docker compose 
```agsl
docker-compose -f docker-compose.yaml up --build
```
2. Stop the docker compose 
```agsl
docker-compose -f docker-compose.yaml down
```

----

### Frontdoor FS Technical Challenge

**Highlight functionality:** Allow users to highlight text on a webpage by selecting it with their mouse when 
the feature is enabled. Show the summary in the tooltip along with associated tags when a user clicks on a highlight.

**API integration:** Integrate the OpenAI API to process the highlighted text and generate a brief summary. 
Ensure that the API calls are properly handled in the backend.

**Display the summary:** Show the summary in a tooltip when the user hovers over the highlighted text using 
a custom React component. Ensure that the tooltip is properly positioned and styled.

**Backend:** Implement a NestJS backend that will handle the API calls to OpenAI and any necessary processing. 
The backend should be properly tested using Jest and Supertest.

### MongoDB 

Highlighted text -> send the text through API -> store in DB -> return the summary.

Schema: 
Text

id: Primary Key
text: String
summary: String 
tags: List<String>
priority: int [we give initial priority - 1, if we search summary of this text again then priority + 1; 
this is useful if we search text by the tags and we list it by priority descending order] 
link: String

