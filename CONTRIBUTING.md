# Contribution guideline

## Introduction

Thank you for considering contributing to VueGL. We welcome any suggestions and
cooperations to make the project better and more enjoyable!

Following these guidelines helps us to avoid unproductive discussions and modifications.
It also helps future contributers to understand contexts and code behaviors.

There are many ways to contribute, from writing tutorials or blog posts, improving
the documentation, submitting bug reports and feature requests or writing code which
can be merged.

## Ground Rules

* Strive to ensure cross-browser compatibility. At least latest modern browsers.
* Categorize and design VueGL components to correspond classes in [three.js](//threejs.org).
* Be welcoming to newcomers and encourage diverse new contributors from all backgrounds.
  See [Code of Conduct](CODE_OF_CONDUCT.md).

## Your First Contribution

If you unsure where to begin contributing, how about starting with following?

* Writing posts: share your feelings, tutorials, etc. on your website or SNS.
* Improving the documentation: add or fix explainations and examples.
* Resolving issues: choose an issue that seems easy to resolve and try creating
  pull request.

Working on your first pull request? You can learn how from this free series, [How
to Contribute to an Open Source Project on GitHub](//egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

Feel free to ask for help. Everyone is a beginner at first.

## Getting started

1. Create your own fork of the code.
2. Do the changes in your fork.
3. Be sure all tests have passed.
4. Be sure following the code style for the project.
5. Send a pull request.

## How to report a bug

**If you find a security vulnerability, do NOT open an issue. [Email us](<mailto:ikeda_hiroki@icloud.com>)
instead.**

When [filing an issue](/vue-gl/vue-gl/issues/new/choose), make
sure the following points.

* What version of VueGL you are using.
* What version of Vue.js you are using.
* What version on three.js you are using.
* What browser you are using. (Name and version)
* How to recreate the problem.
* What you expected to see and what you are seeing instead.

## How to suggest a feature or enhancement

We wish VueGL to implement all features of three.js as possible. We also actively
adopt advanced functions for handling WebGL and 3D graphics easier.

If you find yourself wishing for a feature that doesn't exist in VueGL, you are
probably not alone! There are bound to be others out there with similar needs. If
you think that the enhancement is small enough and you can write codes yourself,
feel free to send a pull request directly. Otherwise, [open an issue](/vue-gl/vue-gl/issues/new/choose)
which describes the feature you would like to see, why you need it, and how it should
work.

## Submitting a pull request

Before you submit a pull request, consider the following points.

* Include appropriate test case.
* Be sure all tests have passed. (By running `yarn test`.)
* Be sure following the code style.  
  * Javascript codes should follow [airbnb style guide](/airbnb/javascript). Run
    `yarn lint` to lint them.
  * Markdown files should follow default rules of [markdownlint](/DavidAnson/markdownlint).
    Run `yarn lint:md` to lint them.
* Check your fixes at documentation examples.
  1. Run `yarn start`.
  2. After jekyll server started, open the address displayed on the terminal.

> You need [Node.js](//nodejs.org) and [Yarn](//yarnpkg.com) to build, test, and
> lint VueGL.  
> You need [Ruby](//www.ruby-lang.org) and [Bundler](//bundler.io) to see documentation
> locally.

## Code review process

After sending a pull request, make sure all required checks have passed. If not,
you should fix them.
> You can ignore the failed checks those are not required, although we refer them.

We look at pull requests within roughly two weeks. If we found anything to be fixed
or feel to need a discussion, we will ask you by leaving a comment.

After feedback has been given, we expect responses within a month. After a month,
we may close the pull request if it isn't showing any activity.

## Contact us

Feel free to [email us](<mailto:ikeda_hiroki@icloud.com>).
