# Contribution guide
## Requirements
For development,
* [Node.js](https://nodejs.org/)
* Any browser [supporting es modules](http://caniuse.com/#feat=es6-module) (for unit tests)
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
If your default browser supports es modules, `yarn test` or `npm test` will show the test results.
Otherwise, start the browser and open `test/index.html`.
## See the rendered documentation
The documents are published via github pages. To render the documents, run `yarn docs` or `npm docs` and visit http://localhost:4000 on the browser.
## Before sending a new pull request...
* If you have created a new component, please add a corresponding test file as possible. Test files should be in `test` directory and also be inserted to the `test/index.html` file.
* Make sure all tests pass.
* Run `yarn` or `npm install` before the last commit to update the bundled modules.
