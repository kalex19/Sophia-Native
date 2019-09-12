<h1 align="center">SOPHIA</h1>

<h3 align="center">Speech Operated Personal Household Interactive Assistant</h3>


## Table of Contents
* [Description](#Description)
* [User Stories](#User-Stories)
* [Tech Stack](#Tech-Stack)
* [How To Use](#How-To-Use)
* [Screenshots](#Screenshots)
* [Demo](#Demo)
* [Learning Goals](#Learning-Goals)
* [Challenges](#Challenges)
* [Successes](#Successes)
* [Extensions](#Extensions)
* [Developers](#Developers)
* [Backend Repo](#Backend-Repo)

## Description

SOPHIA is a speech operated personal household interactive assistant. This app is built for two audiences: Clients and Caretakers. Clients are anyone with a disability (physical, cognitive, long-term, temporary) who needs care. Caretakers include anyone who is willing to help take care of clients. Taking care could include running errands, cleaning, yardwork, paying bills, grocery shopping, etc. SOPHIA was built to connect clients to caretakers to help meet their daily needs. 

Please reference the user stories to understand the full functionality of SOPHIA. 

SOPHIA is an A11Y app with a large focus on accessibility and was create with consulting from Accessibility expert Chris DeMars @chrisdemars. 

## User Stories

### Client

* User can create an account
* User can create a profile
* User can log in
* User can log out
* User can list personal information, contact information, needs, allergies, medications, and dietary restrictions in profile
* User can create a list using Speech-To-Text functionality
* User can edit list name
* User can delete lists
* User can add tasks to lists
* User can edit tasks
* User can delete tasks
* User can increase/decrease importance of tasks
* User can add a due date to a task
* User can add details to a task note
* User can share a list with a caretaker
* User can receive a notification when list/task is completed
* User can use built in microphone to create lists and tasks

### Caretaker

* User can create an account
* User can create a profile
* User can log in
* User can log out
* User can list personal information, contact information, and abilities in profile
* User can subscribe to a client's list(s)
* User can view lists/tasks
* User can view task details
* User can complete tasks
* User can complete notes

## Tech Stack

* React
* Redux
* React Native
* Expo Audio
* Jest
* Enzyme
* CircleCi  [![CircleCI](https://circleci.com/gh/kalex19/Sophia-Native.svg?style=svg)](https://circleci.com/gh/kalex19/Sophia-Native)    

# How To Use

## Install

```sh
npm install
```

## Usage

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Run tests

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Screenshots

### Home Page

<img width="435" alt="HomePage" src="https://user-images.githubusercontent.com/39716292/64733424-f9f64400-d4a1-11e9-809d-bd225b9dd2ca.png">

### Log In

### Create Account - Client

### Create Account - Caretaker

### User Home Page

### My Profile

### My Lists - Client

### My Lists - Caretaker

### My Tasks - Client

### My Tasks - Caretaker

## Demo

coming soon...

## Learning Goals

This is a unique opportunity that presents some valuable goals:

* Ultimately, demonstrate knowledge you’ve gained throughout Turing
* Use an agile process to turn well defined requirements into deployed and production ready software
* Gain experience dividing applications into components and domains of responsibilities to facilitate multi-developer teams. 
* Service oriented architecture concepts and patterns are highly encouraged.
* Explore and implement new concepts, patterns, or libraries that have not been explicitly taught while at Turing
* Practice an advanced, professional git workflow (see whole-team expectations)
* Gain more experience using continuous integration tools to build and automate the deployment of features in various environments
* Build applications that execute in development, test, CI, and production environments
* Focus on communication between front-end and back-end teams in order to complete and deploy features that have been outlined by the project spec

## Challenges

* Integrating Speech-To-Text functionality
* Sending an audio file to the backend to be parsed and sent to Google's Speech API and returned as text
* Testing React Native
* Working in the most up-to-date version of React Native one week after version updates

## Successes

* Recieving text from the backend and rendering the text on the frontend
* Testing React Native
* Creating both client and caretaker accounts and functinoality which goes beyond the MVP
* Meeting with Chris DeMars for accessibility advice and implementing his suggestions so the app is accessibile for clients and caretakers

## Extensions

* User can send a notification of task/list completion to the client
* User can navigate the app using Speech-To-Text functionality

## Developers

👤 **Katie Lewis, Andreea Hanson, Noah Flint, Vince Carollo**

* Github: [@Kalex19](https://github.com/Kalex19)
* Github: [@andreeahanson](https://github.com/andreeahanson)
* Github: [@n-flint](https://github.com/n-flint)
* Github: [@VinceCarollo](https://github.com/VinceCarollo)

## Backend Repo

* Github: [Sophia Repo](https://github.com/n-flint/Sophia-Rails)

## Show your support

Give a ⭐️ if this project helped you!
