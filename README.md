# KrakenFlex API Client

This is a TypeScript application that interacts with the KrakenFlex API. It retrieves outage information, filters it according to specific conditions, and sends the processed data to another endpoint.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm: You need Node.js and npm installed on your machine. You can download Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)

- TypeScript: Install TypeScript globally on your machine by running the following command:

    ```bash
    npm install -g typescript
    ```

- Testing: Install Jest by running the following command: 

    ```bash
    npm install --save-dev jest ts-jest @types/jest
    ```


### Installing

- Clone the repository:

    ```bash
    git clone https://github.com/sethderrick/KrakenBackendTestApp.git
    ```

- Navigate to the project directory:

    ```bash
    cd KrakenBackendTestApp
    ```

- Install the project dependencies:

    ```bash
    npm install
    ```

- Set the environment variable for the API key. You can do this in the shell:

    ```bash
    export API_KEY="your-api-key"
    ```
    

  Or, if you're using a `.env` file, add the following line:
  NOTE: If you're using a .env file, make sure to use the dotenv package to load the environment variables:
    ```bash
    npm install dotenv
    ```
  And then, at the top of your script, add:
    ```bash
    require('dotenv').config();
    ```



### Running the Application

To run the application, compile the TypeScript code to JavaScript and then execute it:

```bash
tsc app.ts
node app.js
```


### Running the Test Suite

To run the tests, simply execute the following command:

```bash
npm test
```

### Contributing changes to this repo

As well as the usual Git commits and pushes and pull requests after changes to this repo, don't forget that TypeScript needs to be transpiled to JavaScript. Any changes made to the *.ts files will require re-running the tsc command on that file to generate a new .js file that includes the changes.

### Built with

- [TypeScript](https://www.typescriptlang.org/) - the primary language for the application
- [Axios](https://axios-http.com/) - library used to make http requests
- [Jest](https://jestjs.io/) - used for testing

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
