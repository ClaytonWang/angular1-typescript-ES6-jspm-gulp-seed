Angular 1.x project seed
========================

The goal of this seed is to use stable technology that offers support for modern browsers and the longest range of future compatibility.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
    - [List of All Technologies](#technologies-used-list)
    - [TypeScript](#typescript)
    - [RxJS](#rxjs)
    - [MongoDB](#mongodb)
    - [Express](#express)
    - [Fonts](#fonts)
- [Front End Sources Pre-installed](#front-end-sources-pre-installed)
    - [Roboto Font](#fonts)
- [Installation & Configuration](#installation-and-configuration)
    - [WebStorm Integration](#webstorm-integration)
    - [Platform & Tools](#platform-and-tools)
    - [Installation](#installation)
- [How to Run](#how-to-run)
    - [Development](#how-to-run-development) 
    - [Production](#how-to-run-production) 
- [How to Test](#how-to-test)
    - [Unit](#how-to-test-unit) 
    - [E2E](#how-to-test-e2e) 
    - [Coverage](#coverage) 
- [Docummetation](#documentation)
    - [SASSDOC](#sassdoc) 
    - [TYPEDOC](#typedoc)
- [How to Build](#how-to-build)
- [How to Deploy](#how-to-deploy)
= [Commit Hooks](#commit-hooks)
- [License](#license)


## Features
  * Use ES6 with Angular 1.x
  * Use ES6 Modules via [SystemJS](https://github.com/systemjs/systemjs) and [ES6 Module Loader Polyfill](https://github.com/ModuleLoader/es6-module-loader)
  * [Conditional module loading with SystemJS](http://martinmicunda.com/2015/10/26/conditional-module-loading-with-systemjs/)
  * JSON Web Token ([JWT](http://jwt.io)) authentication
  * Unit test with ES6, Babel, JSPM, Karma, Jasmine and Istanbul
  * Manage development and production workflow with [JSPM](http://jspm.io/), [SystemJS builder](https://github.com/systemjs/builder) and [Gulp](http://gulpjs.com/)
  * Mocked Backend Workflow - help with mocking backend-less development
  * Achieve some of the Angular 2.0 goals while still running on Angular 1.x

## <a name="technologies-used"></a>Technologies Used

###<a name="technologies-used-list"></a>List

  * [Karma](http://karma-runner.github.io/0.13/index.html)
  * [Protractor](https://angular.github.io/protractor/#/)
  * [Gulp](http://gulpjs.com/)
  * [JSPM](http://jspm.io/)
  * [SystemJS](https://github.com/systemjs/systemjs)
  * [Sass](http://sass-lang.com/guide)
  * [TypeScript](http://www.typescriptlang.org/)
  * [Istanbul](https://github.com/gotwarlost/istanbul)
  * [SASSDOC](http://sassdoc.com/annotations/)
  * [TYPEDOC](http://typedoc.io/guides/doccomments.html)
  

##<a name="ront-end-sources-pre-installed"></a>Front End Sources Pre-installed

  * [Angular 1.x](https://angularjs.org/)
  * [Angular Translate](https://angular-translate.github.io/)
  * [Angulartics](http://angulartics.github.io/)
  * [Google Analytics](https://github.com/angulartics/angulartics-google-analytics)
  * [RxJS](https://github.com/ReactiveX/RxJS)
  * [Roboto Font](https://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic)


###<a name="typescript"></a>TypeScript

TypeScript is used for development to allow for [abstract principles](http://victorsavkin.com/post/123555572351/writing-angular-2-in-typescript). 
Since data typing is not enforced in ES6, typing is set up in this project for the option to use, but not used by default in the the concept files. TypeScript Definition files may be used via the ```tsd``` api.

Use the [tsd cli](https://github.com/DefinitelyTyped/tsd) to download TypeScript Definitions into the 'typings' directory.

Add custom typings in the directory ```typings/custom/```, then run ```tsd rebundle``` to add custom types 
to the typings/tsd.d.ts file.


###<a name="rxjs"></a>RxJS

Version 5.0 Beta of RxJS is installed using the ES6 version -- ```rxjs-es```. The TypeScript Definition files are 
not available to install via ```tsd``` yet, but they are downloaded with the framework upon ```jspm install rxjs-es```.

To fix this issue, a custom Type Definition file is created to import and wrap the type definitions at ```typings/custom/rxjs-es.d.ts```.
Note, this file will need to be updated if upgrading RxJS, or install the Type Definition file from the registry when
available.


###<a name="mongodb"></a>MongoDB

MongoDB is used only as a tool to experiment with front end technologies interacting with a Database, and creating
stateful E2E testing scenarios. It is not installed and configured by default. See ```serverExpress/app.js``` to 
configure MongoDB with the local express server.

See [Install-MongoDB-On-El-Capitan.md](./docs/processes/mongodb/Install-MongoDB-On-El-Capitan.md).

See [MongoDB-Dev-QuickStart.md](./docs/processes/mongodb/MongoDB-Dev-QuickStart.md)

###<a name="express"></a>Express

Node Express is utilized to create stateful scenarios for E2E testing. It is NOT meant to be a real backend solution.
It is simple, minimalistic in architecture to allow front end devs to create real localhost API's to pressure test
their applications. The purpose is to take a step further than $httpBackend mocks in that you can create very customize,
random failures to see how your app will behave under more real and extreme circumstances.

It is configured by default. See ```serverExpress/app.js``` and the ```serverExpress/routes/``` directory as a pattern
to add API's.

The weird "serverExpress" directory name space is used in case you want to add a real server to this environment. 
I intend to add a "serverScalatra" directory in the future to add a Scalatra server.

###<a name="fonts"></a>Fonts

This seed is set up to use [Roboto](https://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic)
using font squirrel to generage the web fonts.


##<a name="folder-structure"></a>Folder Structure

###<a name="folder-structure-development"></a>Development
TODO

###<a name="folder-structure-production"></a>Production
    
Same as development

##<a name="installation-and-configuration"></a>Installation & Configuration
           
###<a name="webstorm-integration"></a>WebStorm Integration

See this [webstorm](./docs/processes/webstorm/webstorm.md) process.

See this [webstorm Tips](./docs/processes/webstorm/wwebstorm-tips.md).

> **Note:** DO NOT set up watchers. The development environment serves native TypeScript and transpiled in the browser
via SystemJS. Production is transpiled and bundled via gulp tasks.


###<a name="platform-and-tools"></a>Platform & Tools

This project was developed with Node.js verion 5.x. No guarantees this will work with earlier versions. PR's welcome!

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) (requires npm version >= 5.0.0 for this project) for installing NodeJS applications and libraries.

[Install Node.js](http://nodejs.org/download/) (requires node.js version >= 5.0.0)

[See this issue](https://github.com/nodejs/node/issues/3606). Run this command in Terminal before installing Node 5.x:

```
sudo rm -rf /usr/local/lib/node_modules/npm
```

***Globals***
You will need Gulp, TypeScript, JSPM and TSD installed globally. These frameworks are also install locally upon npm install.
See [

###<a name="installation"></a>Installation

**1.** Clone or [fork](https://github.com/martinmicunda/employee-scheduling-ui/fork) this repository:
```bash
$ git clone https://github.com/UIUXEngineering/angular1-typescript-ES6-jspm-gulp-seed.git [app name]
$ cd [app name]
```

**2.** Install local dependencies
```bash
$ npm install
```

All NPM, JSPM, and TSD installs should have run. If any of these have failed, you may run them individually.

```bash
$ npm install
$ jspm install
$ tsd install
```

**3.** Install globals

See [this process](./docs/processes/localNPM.md) if you do not want to use global packages. These dependencies
are already installed locally.

```bash
$ npm install -g gulp jspm typescript tsd
```

> **Note:** Verify that all 3rd party dependencies from [package.json](package.json) are installed on your local machine. If you have followed the instructions and there have been no errors when executing the above commands, the dependencies should be installed.
     
##<a name="how-to-run"></a>How to Run

###<a name="how-to-run-development"></a>Development
When you're working on project with real back-end start with:

```bash
$ npm start 
```

or 

```bash
$ gulp watch
```

> **NOTE:** The `npm start` task is alias for `gulp watch`. The back-end code for this application can be found serverExpress directory.

This task will install all dependencies, build dev environment, monitor the source files, compile SASS to CSS, concat language files, and launch the browser for dev, sassdoc, and typedoc.


> **NOTE:** Livereload for TYPEDOC and SASSDOC is not available yet. You have to manually refresh the browsers for SASSDOC and TYPEDOC.

> **NOTE:** TYPEDOC is not automatically compiled upon changes with ts files. Gulp-typedoc does not output a stream, so
compiled files are garbage if fired from a watch.


###<a name="how-to-run-production"></a>Production

```bash
$ gulp deploy
```

> **NOTE:** This run against the code specify in `build/production` folder. See [build](#build) section for more details how `build` is created.


##<a name="how-to-test"></a>How to Test
###<a name="how-to-test-unit"></a>Unit 

To run test start with:

```bash
$ gulp test
```

or

```bash
$ npm test
```

###<a name="how-to-test-e2e"></a>E2E 

```bash
$ gulp e23
```

or 

```bash
$ protractor protractor.conf.js
```

###<a name="coverage"></a>Code Coverage 
TODO

Code coverage is mapped to TypeScript via remap-istanbul npm module. Run:

```bash
$ npm coverage
```

A server will launch showing the generage code coverage.

##<a name="how-to-build">How to Build
The build task get app ready for production. The build task include transpilation from ES6 to ES5, concatenation, minification, compression, asset revision, template cache, cdn etc. If there have been no errors when executing the build command, the build should be located in `build/dist` directory and this build is ready for uploading to the server! To initiate a full build, you simply run the follow task:
```bash
$ gulp deploy
```

##<a name="documentation"></a>Documentation
###<a name="sassdoc"></a>SASSDOC 

```bash
$ gulp sassdoc
```

or to launch a server after compilation


```bash
$ gulp watch.sassdoc
```

###<a name="typedoc"></a>TYPEDOC 

```bash
$ gulp typedoc
```

or to launch a server after compilation


```bash
$ gulp watch.typedoc
```

##<a name="how-to-deploy"></a>How to Deploy
TODO

##<a name="commit-hooks></a>Commit Hooks with Commitizen
Simply use `git cz` instead of `git commit` when committing. 

When you're working in a Commitizen friendly repository, you'll be prompted to fill in any required fields and your commit messages will be formatted according to the the standards defined by project maintainers. 

[![Add and commit with Commitizen](docs/assets/add-commit.png)

If you're not working in a Commitizen friendly repository, then `git cz` will work just the same as `git commit`.

###<a name="how-to-test-e2e"></a>E2E 
TODO

##<a name="how-to-release"></a>How to Release
TODO

### References

* [Writing AngularJS Apps Using ES6](http://www.sitepoint.com/writing-angularjs-apps-using-es6/)
* [Using ES6 with Angular today](http://blog.thoughtram.io/angularjs/es6/2015/01/23/exploring-angular-1.3-using-es6.html)
* [AngularJS with TypeScript 1.5 and ES6-Modules.md](https://gist.github.com/nahody/c2e10083b869c8b32c8e)

## License

    Copyright (c) 2016 Jerry Orta 

    Source code is open source and released under the GNU GPL v3 license.
