# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

-----

#### Train of thoughts 
1. Create simple chrome extension and get the selected text and just console log the selected text [DONE]
2. Followed by it, make the api call to the backend to create the text and get its summary and category and console
   log that as  well. [DONE]
3. created mouse over effect with summary and tags for the highligted text but it seems quite unstable  [DONE]
4. We could rather provide a small summary button by the highlighted text. it would be easier and we won't get the summary tooltip 
   triggered everytime we accidently hover on the text [DONE]
5. Create the minimize summary button when we click the extract summary button for the highlighted text [DONE]
6. Create a page to show the list of all text and summary with list of tags (pagination is not in the scope) [DONE]

Can we highlight the text more optimally? Currently, using the parent node, but it doesn't feel very optimal highlighting with the 
same [Tried to use the start and end of selected element to keep track and highlight it, but it has few edge cases I am currently
not able to implement. Easiest option is to highlight the first selected text.]