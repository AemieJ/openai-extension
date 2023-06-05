## Front Door Labs Assignment 

### **Requirements**

1. **Chrome extension:** Create a Chrome extension with a popup that includes a button to enable/disable the feature and a list of summaries generated so far. [Did using context menu and react page]
2. **React components:** Develop reusable React components for the popup, highlights list, and summary tooltip. Enable sorting and filtering by date and tags in the highlights list. [The list of summaries comes pre-sorted in descending order of priority per tag]
3. **State management:** Use React hooks and context API to manage the application state. Ensure that the state is properly typed using TypeScript. [DONE]
4. **TypeScript:** Strictly use TypeScript throughout the project and ensure proper typing for all components and functions. [DONE, only used background js currently. Didn't have the time span to convert it to typescript. Rest is purely typescript]
5. **Highlight functionality:** Allow users to highlight text on a webpage by selecting it with their mouse when the feature is enabled. Show the summary in the tooltip along with associated tags when a user clicks on a highlight. [Did with right context menu, and provided an easy button feature for easier functionality, highlighting text wasn't covering all edge cases.]
6. **API integration:** Integrate the OpenAI API to process the highlighted text and generate a brief summary. Ensure that the API calls are properly handled in the backend. [DONE]
7. **Display the summary:** Show the summary in a tooltip when the user hovers over the highlighted text using a custom React component. Ensure that the tooltip is properly positioned and styled. [DONE; display summary + tags]
8. **Backend:** Implement a NestJS backend that will handle the API calls to OpenAI and any necessary processing. The backend should be properly tested using Jest and Supertest. [Unit testing done]
9. **Data persistence:** Store the user's highlights and summaries using MongoDB. Ensure that the data models are properly typed and that the database calls are properly handled. [DONE using docker mongodb image]
10. **Testing:** Write unit tests for your code to ensure the proper functionality of the Chrome extension, with a focus on testing React components and TypeScript typings. Write integration tests for the backend using Jest and Supertest. [Did unit & integration testing for backend]

### How to setup? 

#### Backend
1. In one terminal: `cd backend`
2. Run the following: 
```bash
npm install --no-audit
yarn add
```
3. Run the following command to build the node image and setup the MongoDB:
```bash
docker-compose -f docker-compose.yaml up --build
```
4. Backend will be running on port 8080: `http://localhost:8080`
5. To run the test within the same folder: `npm run test`
6. Once you have finished using the project, delete all docker images using:
```bash
docker-compose -f docker-compose.yaml down
```

```bash
Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        48.976 s
Ran all test suites.

```

#### Extension 
1. In another terminal: `cd frontdoorlabs-extension`
2. Run the following: 
```bash
npm install --no-audit
yarn add 
```
3. To build the folder to use it as an extension, run the
following: 
```bash
npm run build
```
4. Once build is done, run the following command: 
```bash
npm run start

```
5. Load Unpack on `chrome://extension` in your browser. The 
video `FrontDoor Labs.mov` shows detailed manner of how I
implemented. 






