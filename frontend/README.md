# IdeaDog - Front-End

The front-end of IdeaDog, built using React, with TypeScript.

## Medium Blog Article :newspaper:

I built the front-end of IdeaDog with modern React practices in mind. Read more about what I mean by that in my dedicated blog post, linked below:

[Building a Modern React Web Application  —  The IdeaDog Front-End](https://medium.com/@bdov_/building-a-modern-react-web-application-the-ideadog-front-end-bc56dd3ca4b6)

## Features :open_mouth:

* Designed with [Material-UI](https://material-ui.com/).
* All hooks and functional components, _zero_ traditional React class components.
* Asynchronous, declarative data fetching and routing using [Navi](https://frontarm.com/navi/).
* List virtualization for idea-displaying using [react-virtual-list](https://www.npmjs.com/package/@dwqs/react-virtual-list).
* Passwordless user account authentication managed by [Auth0](https://auth0.com).
* Responsive!

## Dependencies :couple:

**Front-End**:

| Tool/Library             | Version |
| ------------------------ | ------- |
| [TypeScript](https://www.typescriptlang.org/) | ^3.5.2  |
| [React](https://reactjs.org/) | ^16.8.6 |
| [Material UI](https://material-ui.com/) | ^4.1.3 |
| [Navi](https://frontarm.com/navi/) | ^0.12.9 |
| [Auth0-JS](https://auth0.com) | ^1.0.4 |
| [@dwqs/react-virtual-list](https://www.npmjs.com/package/@dwqs/react-virtual-list) | ^1.0.0  |
| [clipboard-copy](https://www.npmjs.com/package/clipboard-copy) | ^3.0.0  |

View the complete list of front-end dependencies in the corresponding [package.json](./package.json).

**Packaging/Deployment**:

| Tool/Library     | Version    |
| ---------------- | ---------- |
| [Node.js](https://nodejs.org/en/) | ^12.5.0 |
| [Yarn](https://yarnpkg.com/en/) | ^1.16.0 |
| [Parcel](https://parceljs.org/) | ^1.12.3 |

## Usage :running:

Assuming the above packaging/deployment dependencies have been installed, set the up front-end React environment as follows:

1. Install dependencies: `yarn install`
2. Run the development server: `yarn start`
3. Build the production folder (outputs to `/dist`): `yarn build`