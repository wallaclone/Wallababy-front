# WallaBaby 

> Buy or sell second hand items for your children on WallaBaby! 

![dashboard](https://github.com/wallaclone/wallababy-front/blob/develop/readme-imgs/dashboard.png)


WallaBaby is a full stack application that displays a list of ads handled via RESTful API. It lets registered users create, edit and delete their own ads among other features. 


## Live version 🚀🚀

Link to [live version here](http://15.236.20.68/dashboard)

## Getting started 

To run this project locally do the following:

- First clone the backend project and follow the instructions there. [Link to repository](https://github.com/wallaclone/Wallaclone-back)
- Clone this project
- Run ```npm install``` to install all the dependencies
- Change .example.env file name to .env and include the required environment variables
- Run ```npm start``` and start server on http://localhost:3001/ 


## Features

![features-gif](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/use-example.gif)

- Anonymous users will be able to see the main page of the application, that shows a paginated list of the ads loaded from the API, and the detailed page of each ad. Searching and filtering is also possible when not logged in

- Users can create an acount and log in. A token will be generated when logging in allowing the user access to the private sections of the app

- If an user forgets their password they'll be able to change it 

![password-recovery](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/password-recoverypage.png)

![password-recoverymail](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/password-recoverymail.png)


- Logged in users can create ads, edit and delete their ads 

![ad-edition](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/edit-ad.gif)


- Users can also mark their ads for sale as reserved or sold
![reserved-sold](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/reserved-sold2.png)

![reserved-sold](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/reserved-sold.png)


- Users can fav the ads created by other users 

- If an user is interested in an ad they can ask to get in touch with the owner and an email with their contact info will be sent to them

![get-contact](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/contact.png)

![email](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/contactmail.png)

- Push notifications (only available on local). Users with an active session will recieve an alert when one of their favved ads changes
![languagechange](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/notifications.gif)

- App is fully available in both English and Spanish thanks to [react-intl](https://formatjs.io/docs/react-intl/components/)

![languagechange](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/language.gif)


- Responsive design

![mobile-capture](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/responsive.png)

## Future improvements

- Chat implementation. We have some bits of the chat interface already working and we hope to have it done soon!

![chat](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/chat.gif)


- Design and accesibility improvements

- Code refactoring and bug fixing (i.e fixing validateDOMNesting warnings). (Contributions such as bug fixes, pull requests, feature requests will be highly appreciated!)

## API documentation  📖
![api-insomnia](https://github.com/wallaclone/Wallababy-front/blob/develop/readme-imgs/apidocu.png)

Checkout the API documentation [here](http://instinctive-tub.surge.sh/)

## Built with 

- React & React Bootstrap
- NodeJS & Express
- MongoDB & Mongoose
- Deployed with AWS

## Authors 

This app was made as a final project during the **Keepcoding Fullstack Web Development Bootcamp** (VIII Edition) by Gonzalo Liaño, Sergio Pérez and Gema Segarra.

<table>
<tr><td align="center"><a href="https://github.com/Gon99"><img src="https://avatars0.githubusercontent.com/u/43567070?v=4" width="100px;" alt="Gonzalo avatar"/><br/><sub><b>Gonzalo</b></sub></a><br/><a href="https://github.com/Gon99"></a>
<td align="center"><a href="https://github.com/SergyPC"><img src="https://avatars2.githubusercontent.com/u/57828810?v=4" width="100px;" alt="Sergio avatar"/><br/><sub><b>Sergio</b></sub></a><br/><a href="https://github.com/SergyPC">
<td align="center"><a href="https://github.com/gemasegarra"><img src="https://avatars2.githubusercontent.com/u/40056297?v=4" width="100px;" alt="Gema avatar"/><br/><sub><b>Gema</b></sub></a><br/><a href="https://github.com/gemasegarra"></a>
</a>
</table>


---
