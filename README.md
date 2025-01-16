# Shop application
A responsive web-based e-commerce platform built using JavaScript frameworks like React and Material UI for front-end and express with mongodb database as backed. Main aplication features - user login/register, searching for products and adding them to cart.

## Preview
![mainPage](https://github.com/user-attachments/assets/71192295-ce4e-4911-b75a-d053c48ae256)
![search](https://github.com/user-attachments/assets/aeb7acd4-4164-4323-a379-9a4fea034a08)
![responieves](https://github.com/user-attachments/assets/79ca130a-bb5c-429d-b925-375732e2c1a4)
![password](https://github.com/user-attachments/assets/dee7805c-cfb4-4b81-b5a8-41e709bf6141)
![product](https://github.com/user-attachments/assets/788d30e9-4c47-4ade-aad9-69424e470998)
![reviews](https://github.com/user-attachments/assets/3df8e3b4-4e6d-489f-8c78-69e765becb1f)
![cart](https://github.com/user-attachments/assets/a37a14b1-c020-4751-95b9-4c73583e6383)


## Geting started
You need to have installed
- Node.js (lts)


And create mongodb database https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial

## Usage
In server directory crate fite **.env** and write in it 
```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@shopdatabase.ozyp7.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=<appname>
JWT_SECRET=secretPassword
```
open terminal and write
```terminal
git clone https://github.com/Pawo0/Shop.git
cd Shop
npm install
node server/createDB/initializeDB.js 
npm start
```
next go to http://localhost:5173

## Features 
- User login/register with JWT
- Updating account
- Adding product to cart
- Adding review to a product
- Order history
- Responsive site

## Used technology
- TypeScript
- React 18
- React router
- Material UI - components library
- Express
- Mongoose
- JsonWebToken
- Axios
