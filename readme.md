<h1 align="center">
Footprint calculator
</h1>

<p align="center">A carbon footprint calculator helps people be more aware of their contribution to the current environmental problem and what they can do to lessen their impact on the environment.</p>

<p align="center">
  <a target="_blank" rel="noopener noreferrer" href="https://pt-br.reactjs.org/">
   <img src="https://img.shields.io/npm/v/react.svg?style=flat" alt="react version 17.0.2">
  </a>
  <a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/Typescript-4.5.5-blue" alt="typescript version 4.5.5">
  </a>
  <a target="_blank" rel="noopener noreferrer" href=https://testing-library.com/docs/react-testing-library/intro">
    <img src="https://img.shields.io/badge/%40testing--library%2Freact-12.1.2-brightgreen" alt="react testint library version 12.1.2">
  </a>
  <a target="_blank" rel="noopener noreferrer" href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/Node-12.20.1-brightgreen" alt="node version 12.20.1">
  </a>
</p>

<div align="center">
    <img src="./readme_assets/application.png" width="600px;"/>
</div>

<hr>

## Participants

| [<img src="https://avatars.githubusercontent.com/u/37480915?s=400&u=014af73bcbae60693a66c33102fc04a9308f0b81&v=4" width="75px;"/>](https://github.com/gabrielEloy) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: |

| [Gabriel Eloy](https://github.com/gabrielEloy)

## Getting started

1. Clone this repository;<br />
2. Run `npm run install-dependencies or yarn install-dependencies` at the project's root directory to install dependencies.<br />
3. Run `npm run start` or `yarn start`.<br />
4. Access `localhost:3000` in your browser.<br />

## API Docs

This project is documented using a swagger. To access it, access the api server (which runs by default in localhost:3000)
and request the endpoint `/api-docs`. By doing so, you will be able to access swagger-ui and consume the API's docs

<div align="center">
    <img src="./readme_assets/swagger.png" width="600px;"/>
</div>



## Testing

The projects test suite isn't unified. So you must run the front end tests and the back end test separately. To do so, navigate to the application you want to test (client or server) and type the following:

```
yarn test
```

or 


```
npm run test
```