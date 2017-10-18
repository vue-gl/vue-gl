# Contribution guide
## Requirements
For development,
* [Node.js](https://nodejs.org/)
* Any modern browser (for testing your codes.)
* [Ruby](https://www.ruby-lang.org/) (for documentation)

are required.
## Download and install dependencies
1. Clone repository
    ```
    git clone https://github.com/vue-gl/vue-gl.git
    ```
1. Run install script
    ```
    yarn
    ```
    or you doesn't use yarn yet,
    ```
    npm install
    ```
## Unit test
1. Install [karma launchers](http://karma-runner.github.io/1.0/config/browsers.html) for your browsers  
    If you use Chrome,  
    `npm install karma-chrome-launcher`  
    If you use Firefox,  
    `npm install karma-firefox-launcher`  
    If you use Internet Explorer,  
    `npm install karma-ie-launcher`  
    If you use Safari,  
    `npm install karma-safari-launcher`  
    If you use Opera,  
    `npm install karma-opera-launcher`  
1. Run test  
    `yarn test --browsers Chrome,Firefox,IE,Safari,Opera`  
    or  
    `npm test -- --browsers Chrome,Firefox,IE,Safari,Opera`
## See the rendered documentation
The documents are published via github pages. To render the documents, run `yarn start` or `npm start` and visit http://localhost:4000 on the browser.
## Before sending a new pull request...
* If you have created a new component, please add a corresponding test file as possible. Test files should be in `test` directory.
* Please update documentation if your change is effective to the api.
* Run `yarn` or `npm install` before the last commit to update the bundled modules.
