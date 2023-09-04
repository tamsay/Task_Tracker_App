# Task_Tracker_App

A task tracker app created with React

## Running the project

1. Install Node.js if not already installed: [Node.js](https://nodejs.org/)
2. Clone the repo
3. Navigate to the project directory
4. Install dependencies using `npm install` or `yarn`
5. Run the application using `npm run dev` or `yarn dev`
6. Create, Edit, Delete and Set reminders on tasks as desired.

## Some important points to note

1. Local storage is used to persist data in the App.
2. To clear the storage and reset the app, a reset button is provided. Clicking this button restores the app to its default state.
3. Redux is used for state management.
4. A toast message with sound notification is displayed whenever the reminder time set for any task has elapsed.
5. Tasks with reminder times that have not elapsed have a green active notification icon at the top right corner of the card as well as a green left border. Elapsed reminders have a grey-out bell notification icon alone.
6. Tasks can be marked as complete or incomplete. performing each action moves the card to their respective page/tab.
7. All Deleted tasks can be found on the deleted page/tab. No action can be performed on them.
8. On desktop view, users can choose between list view or grid view by clicking the appropriate view icon. Only the list view is available on mobile.

## Live Demo

[Hosted Link](https://tamsay-simple-task-tracker.netlify.app/)
