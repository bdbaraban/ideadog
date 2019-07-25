# IdeaDog - Front-End

The front-end of IdeaDog, built using React, with TypeScript.

## Medium Blog Article :newspaper:

I built the front-end of IdeaDog with modern React practices in mind. Read more about what I mean by that in my dedicated blog post, linked below:

[Building a Modern React Web Application  —  The IdeaDog Front-End](https://medium.com/@bdov_/building-a-modern-react-web-application-the-ideadog-front-end-bc56dd3ca4b6)

## Features :open_mouth:

- **Modern design.** With help from [Material-UI](https://material-ui.com/).
- **Hooks hooks hooks!** IdeaDog features _zero_ traditional React components.
- **List virtualization.** I tried combinations of five different list virtualization libraries before I discovered [React Virtual List](https://www.npmjs.com/package/@dwqs/react-virtual-list). Check it out!
- **Asynchronous, declarative routing and data-fetching.** Did I mention like hooks? Shout-out to [Navi](https://frontarm.com/navi/en/).
- **Passwordless user account authentication.** Managed by [Auth0](https://auth0.com).
- **Responsive.** Mobile-first!

## Routes :light_rail:

- `/:sort?tags`: The home page of IdeaDog, filters displayed ideas by `:sort`, `?tags` and `?search`.
- `/idea/:id`: Displays a specific idea with id `:id`.
- `/user/:id`: Displays a page for a user with id `:id`.

## Dependencies :couple:

**Front-End**:

| Tool/Library                                                                       | Version |
| ---------------------------------------------------------------------------------- | ------- |
| [TypeScript](https://www.typescriptlang.org/)                                      | ^3.5.3  |
| [React](https://reactjs.org/)                                                      | ^16.8.6 |
| [Material UI](https://material-ui.com/)                                            | ^4.2.1  |
| [Navi](https://frontarm.com/navi/)                                                 | ^0.13.3 |
| [Auth0-JS](https://auth0.com)                                                      | ^9.11.2 |
| [@dwqs/react-virtual-list](https://www.npmjs.com/package/@dwqs/react-virtual-list) | ^1.0.0  |
| [clipboard-copy](https://www.npmjs.com/package/clipboard-copy)                     | ^3.0.0  |

View the complete list of front-end dependencies in the corresponding [package.json](./package.json).

**Packaging/Deployment**:

| Tool/Library                      | Version  |
| --------------------------------- | -------- |
| [Node.js](https://nodejs.org/en/) | ^10.16.0 |
| [Yarn](https://yarnpkg.com/en/)   | ^1.17.3  |
| [Parcel](https://parceljs.org/)   | ^1.12.3  |

## Usage :running:

Assuming the above packaging/deployment dependencies have been installed, set the up front-end React environment as follows:

1. Install dependencies: `yarn install --network-timeout 500000`

   - _Network timeout must be increased to permit `@material-ui/icons` sufficient time to download._

2. Run the development server: `yarn start`
3. Build the production folder (outputs to `/dist`): `yarn build`

## Author :black_nib:

- **Brennan D Baraban** <[bdbaraban](https://github.com/bdbaraban)>
