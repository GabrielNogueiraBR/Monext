<p align="center">
 <img src="https://github.com/GabrielNogueiraBR/Monext/blob/main/src/public/assets/images/MonextLogo.svg" width="60%">
</p>

<p align="center">
 <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
 <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
</p>
<p align="center">
 <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
 <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white">
</p>

# 🌍 Monext Galaxy

Monext
The monext is a multiscreen application that redefines the way you check into converting your money: the first step you need to do is to select the country you are, and inputting the amout of Money you have to convert. The next step is all done by the app: it will show a carousel of countries, with some basic info of them: their flag, the converted Money you’ve inputted before, the local timezone (at their capital), and the temperature at their capital.
At first, we’ll have a controller, that will need to have an input of the amount of Money that you will convert. The currency will be decided after you choose your country. For example, if you choose Brazil, the currency will be BRL, if you choose United States, USD, and so on.
Then, it will look really similar to Liquid Galaxy. It will have a controller, and some screens with the information of the countries. By using the controller, you will be able to decide if you want to go to the next screen, to go back one, go to the last one or the first. The controller will also give you an option that will be able to go back to the homepage, and define again the amount of Money and the country that will be used as a base.

# 👀 App Preview
``Coming soon``

## 📝 Installation

1. Clone the [repository](https://github.com/GabrielNogueiraBR/Monext)
`git clone https://github.com/GabrielNogueiraBR/Monext.git`

2. Install npm packages
`npm install`

3. Fill the `.env` file (consult the secrets with the project maintainer)
```
PORT=

EXCHANGE_API_URL=https://exchange-rates.abstractapi.com/v1/live 
EXCHANGE_API_KEY=
TIMEZONE_API_URL=https://timezone.abstractapi.com/v1/current_time
TIMEZONE_API_KEY=
WEATHER_API_URL=http://api.weatherapi.com/v1
WEATHER_API_KEY=
GET_POSTMAN_API_URL=https://countriesnow.space/api/v0.1
```

4. Starting the project
`npm start`

## 📦 External packages
[ExpressJS](https://expressjs.com/) - is used to run the server with all routes and business rules together with Socket.io
</br>
[Socket.io](https://github.com/socketio/socket.io) - is used to make the multi-screen connection in this project, it is through it that the controller will communicate and send the events that will make the user to move the screens from one side to the other, in a carousel format.
</br>
[Figma](https://www.figma.com/file/huI74oLZX9039WjZddKyIg/?node-id=103%3A2) - is used to prototype the application screens

## 👨‍💻 Usage
`pending`

## 👨‍👦‍👦 Contributors
<div align="center">
 <a href="https://github.com/GabrielNogueiraBR" target="_blank"><img src="https://avatars.githubusercontent.com/u/30303558?v=4" width="8%"></a>
 <a href="https://github.com/VitorGois" target="_blank"><img src="https://avatars.githubusercontent.com/u/69533533?v=4" width="8%"></a>
 <a href="https://github.com/CordeiroOtavio" target="_blank"><img src="https://avatars.githubusercontent.com/u/69653683?v=4" width="8%"></a>
 <a href="https://github.com/ryanraul" target="_blank"><img src="https://avatars.githubusercontent.com/u/42502534?v=4" width="8%"></a>
 <a href="https://github.com/gferrazz" target="_blank"><img src="https://avatars.githubusercontent.com/u/48798017?v=4" width="8%"</a>
</div>

## 📃 License
