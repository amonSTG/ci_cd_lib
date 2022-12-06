# IBAN validator library

## How to build this library

1. Install dependencies
```
npm install
```

2. Use TypeScript's ```tsc``` command to build the ```*.js``` file. The result will be a ```dist/main.js``` file.

##  How to use this library

The intention of this library is to have a small sample of code that can be build, tested and packed into an npm package. Optionally, the topics "Code coverage" and "Static code analysis" can also be covered.

To get the library without any tests please checkout the first commit "*Initial commit*" of this repository.

The additional commits in this repository support the instructor on its way to show the trainees how to create a CI/CD pipeline. Each of the following sections mention the commit where the complete code could be checked out of the repo.

## Testing the library

Commit: "*Added Mocha specs*"

It is recommended to use Mocha with Chai for the tests. The suggested test scenarios are:

* Validate a valid IBAN (e. g. "DE22790200760027913168")
* Validate an invalid IBAN (e. g. "DE21790200760027913173")
* Validate an IBAN with an invalid length (e. g. "DE227902007600279131")
* Validate an IBAN with a country code that is not in the list (e. g. "XX22790200760027913168")

It is not neccessary to create all specs, the instructor may select the ones that fits best. Depending on the performance level of the participants, the instructor may create scenarios together with them or the participants can write at least one scenario themselves.

To execute the tests add the following script to the ```script``` section of the ```package.json```:

```json
"scripts": {
    "test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' mocha"
}
```

Mocha itself is configured in the ```.mocharc.json``` file.

```javascript
"use strict";

module.exports = {
    recursive: true,
    require: ["ts-node/register"],
    spec: "test/**/*.spec.ts",
}
```

After testing the library the instructor may show the trainees how to add a build script to the ```package.json```.

```json
    "build": "npm run test && tsc"
```

## Add code coverage with nyc

Commit: "*Configured code coverage support with nyc*"

Just as with creating the tests, the instructor should decide whether to configure "nyc" together with the participants or simply show the code coverage report and explain its usefulness.

1. To be able to add a code coverage report to your tests the following npm packages must be installed:

* @istanbuljs/nyc-config-typescript
* nyc
* source-map-support

```
npm install --save-dev @istanbuljs/nyc-config-typescript nyc source-map-support
```

2. Create the configuration file ```.nycrc.json``` for the nyc library!

```json
{
    "check-coverage": true,
    "extension": [
        ".ts"
    ],
    "extends": "@istanbuljs/nyc-config-typescript",
    "exclude": [
        "**/*.d.ts"
    ],
    "include": [
        "src/**/*.ts"
    ],
    "reporter": [
        "lcov"
    ],
    "temp-dir": "./.tmp",
    "watermarks": {
        "lines": [
            80,
            95
        ],
        "functions": [
            80,
            95
        ],
        "branches": [
            80,
            95
        ],
        "statements": [
            80,
            95
        ]
    }
}
```

3. Add the ```source-map-support``` to the ```.mocharc.js``` file!

```javascript
"use strict";

module.exports = {
    recursive: true,
    require: ["ts-node/register", "source-map-support/register"],
    spec: "test/**/*.spec.ts"
}
```

4. Modify the ```test``` script in your ```package.json``` (add the ```nyc``` command directly in front of the ```mocha``` command)!

```json
"test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' nyc mocha"
```

Now everything's ready to start testing. After running a test with ```npm run test``` a code coverage report should exist in the ```coverage/lcov-report``` directory.

## Add source code documentation

Commit: "*Integrated JSDoc into the project*"

To add the ability to create a source code documentation for this project JSDoc is used together with the "better-docs" plugin for TypeScript (and even Vue.js). It is recommended to checkout the corresponding commit from the respository because configuring JSDoc is a little bit time consuming and out of the scope of this lesson.

This commit also contains a fully documented version of the ```src/main.ts``` file.

Just add a ```doc``` script to your ```package.json``` like the one below and create a source code documentation.

```json
"doc": "jsdoc -c .jsdocrc.json"
```

The documentation will be created in the ```docs/jsdoc``` directory.

You may also modify the ```build``` script like this:

```json
    "build": "npm run test && npm run doc && tsc"
```

## Static code analysis

Commit: "*Added ESLint for static code analysis*"

This project is pre-configured to use ESLint with a set of rules to analyse and to fix TypeScript files. Just add the two following scripts to your ```package.json``` to start linting the code:

```json
    "lint": "eslint src/",
    "lint-fix": "eslint --fix src/"
```
At first the ```lint``` script should be executed to show the output of ESLint. In the next step the ```lint-fix``` script could be used to fix all the errors.

Additionally the ```build``` script should be modified to include the ```lint-fix``` step.

```json
    "build": "npm run test && npm run lint-fix && npm run doc && tsc"
```
## Storing test results

Commit: "*Set test reporter to XUnit*"

After the build process has been executed locally the project should be made ready to be build and published by a Github Actions pipeline. Therefore, the Mocha test results have to be stored within a file. Thus, the instructor should configure the XUnit test reporter for Mocha in the ```.mocharc.js``` file.

```javascript
"use strict";

module.exports = {
    recursive: true,
    require: ["ts-node/register", "source-map-support/register"],
    spec: "test/**/*.spec.ts",
    reporter: "xunit",
    reporterOptions: "output=mocha-results.xml"
}
```
## Create the build-library.yaml pipeline

Commit: "*Created build pipeline*"

Now that the project is ready to be build by a pipeline the instructor should checkout the "*Created build pipeline*" commit to explain the build pipeline ```.github/workflows/build-library.yaml```. Running this pipeline executes all the steps that have been formerly executed locally (building, testing, linting, documenting). Additionally this pipeline stores the following artifacts created within the process:

* The code coverage report
* The Mocha test results as xunit.xml
* The JSDoc source code documentation
* The contents for the npm package to be published

## Prepare the library to be delivered

After the library has passed all tests in the ```.github/workflows/build-library.yaml``` pipeline it should be made ready to be pulished as a npm package to Github Packages. Therefor:

### Add a .npmignore file

Commit: "*Added publish config*"

To be able to publish the npm package to Github Packages the following snipped has to be added to the ```package.json``` file.

```json
"publishConfig": {
    "@crasyhorse:registry": "https://npm.pkg.github.com"
  },
```

Add the file ```.npmignore``` and explain is meaning to the trainees.

```
.eslintrc.json
.github/
.jsdocrc.json
.mocharc.js
.nycrc.json
coverage/
docs/
```

### Create the release-library.yaml pipeline

Commit: "*Created release pipeline*"

The instructor should add a new file called ```.github/workflows/release-library.yaml``` like the one below:

```yaml
name: "Publish IBAN validator library to Github Packages"
run-name: ${{ github.actor}} is running the build job
on:
  release:
    types: [created]
jobs:
  release-the-library:
    needs: call-build-job
    runs-on: ubuntu-20.04
    permissions:
      packages: write
      contents: read
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: "Package content"
      - name: "Build with Node.js 16.16.0"
        uses: actions/setup-node@v3
        with:
          node-version: 16.16.0
          registry-url: https://npm.pkg.github.com/
          cache: "npm"
      - name: "Publish the library"
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Actually there is only the release job. Before the build job can be added the file ```.github/workflows/build-library.yaml``` must be refactored (see the next step).

### Make the build job reusable

Commit: "*Made the build job reusable*"

1. Move the file ```.github/workflows/build-library.yaml``` to ```.github/workflows/build-job.yaml```.
2. Modify the file ```.github/workflows/build-job.yaml``` like this:

```yaml
name: "Build IBAN validator library"
on: [workflow_call]
jobs:
  build-iban-validator-library:
```

The rest of the file remains unchanged.

3. Create a new file called ```.github/workflows/build-library.yaml``` and include the recently created ```.github/workflows/build-job.yaml```.

```yaml
name: "Creates a fresh build of the IBAN validator library"
run-name: ${{ github.actor}} is running the build job
on: [push]
jobs:
  call-build-job:
    uses: ./.github/workflows/build-job.yaml

```

### Add the build job to the release pipeline

Commit: "*Completed the release pipeline*"

Now that the build job resides in its own ```*.yaml``` file it could be included into the release pipeline like this:

```yaml
name: "Publish IBAN validator library to Github Packages"
run-name: ${{ github.actor}} is running the build job
on:
  release:
    types: [created]
jobs:
  call-build-job:
    uses: ./.github/workflows/build-job.yaml
  release-the-library:
    needs: call-build-job
    runs-on: ubuntu-20.04
    permissions:
      packages: write
      contents: read
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: "Package content"
      - name: "Build with Node.js 16.16.0"
        uses: actions/setup-node@v3
        with:
          node-version: 16.16.0
          registry-url: https://npm.pkg.github.com/
          cache: "npm"
      - name: "Publish the library"
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Release the package

Now the instructor should create a new release of the library to demonstrate the effect of the release pipeline. After the pipeline has finished its job there should be a npm package at the Package section of the Github repository.