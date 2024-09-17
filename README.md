# MyChatAppClient

## A form of explanation
Ok so this is not pretty but is literally my first Angular app put together rapidly. First up - it doesn’t work with the backend as intended. I've deliberately left some commented out code in the files so you can see what avenues I blundered down. Also there is 0 styling. That being said here is the idea behind what was created. 

I wanted a user flow of a User logging in, or registering and logging in, and then being presented with a list of joinable chatrooms. That list would have 'join' and/or 'leave' next to each item in the list or you clicked on the chat room name to view the room (if allowed). The User would then have a chat screen with a text box to write in and an updating transcript of the conversation. By using SignalR all users in the chat would be updated in real-time but the conversations would be persisted on the backend to the database so they could be recalled and rejoined any time. A logout would bounce you back to the login screen.

Also on the list of 'future improvements' was some sort of recall of membership of groups for a user. 

## What went well
To be honest not a lot other than I got my first Angular App to stutter into life. I enjoyed getting to know some of the concepts behind Angluar development though and I will find some time to follow this to a better conclusion. 

## What went wrong
The routing never worked properly so that navigation to a chat room bounced me to the login screen again. In debug mode I was seeing some messages get through to the backend to be updated to the database but I was missing the token I passed which I wanted to get the username from. Similarly the broadcast of the messages back to clients never worked. That was a combination of a lack of SignalR and Angular knowledge together. 

Also I never enforced much of a design structure on this app. There is one model but the rest is a mass of components and modules. I need to learn what the correct etiquette is on Angular components and modules and general structure. Lastly not a single unit test or test of any kind!

## Angular Version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.



