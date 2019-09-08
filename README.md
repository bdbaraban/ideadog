<h1 align="center">IdeaDog</h1>
<p align="center">
  A [statically-typed] social ideas platform.
</p>

<p align="center">
  <img src="https://github.com/bdbaraban/ideadog/blob/master/assets/ideadog-logo.png"
       alt="IdeaDog logo"
  />
</p>

## NOTE ON IDEADOG DEVELOPMENT :dog:

Note that the current state of this repo and project will soon be outdated - I am currently hard, hard at work at completely revamping the front-end of IdeaDog. And I mean completely revamping. I am in the process of:

- Converting the app onto server-side rendering with Next.js.
- Converting authorization process into magic link sign in.
- Moving authorization logic onto server with Express.
- Reorganizing global state management with Redux & Redux Thunk.
- Design overhaul.

If you would like a sneak peek at the code behind this revamp, you can check out [this branch](https://github.com/bdbaraban/ideadog/tree/nextjs).

Stay tuned, there are some big-time updates in the works for IdeaDog. - Brennan

## Description :bulb:

IdeaDog is a social media web application for sharing ideas.

We have all had those moments, those sudden bursts of inspiration where we think - "wow, that is simply a _great_ idea" - but know we will never follow up. Now, instead of losing those ideas, share them with the world!

### Why statically-typed?

Our kind of question.

The front-end of IdeaDog is built in React, with TypeScript, while the back-end runs on Rust. In our book, TypeScript + Rust = The Ultimate Statically-Typed Web App!

### I have a great idea! Where can I post it?

IdeaDog is currently deployed at [ideadog.site](https://ideadog.site) - please do check it out!

#### NOTE

Note that authorization is currently buggy. If you attempt to log in/sign up, you will need to refresh the page twice upon verification for your account to register. Read the development note above for news on coming fixes ^^^.

## Medium Blog Posts :newspaper:

For a more in-depth description of IdeaDog as well as an overview of its tech stack and development process, we have written a series of articles on Medium. You can read them at the links below:

- [Introducing IdeaDog — A \[Statically-Typed\] Social Ideas Platform](https://medium.com/@bdov_/introducing-ideadog-a-statically-typed-social-ideas-platform-aeb3a6dcf04f)
- [IdeaDog Back-End Overview](https://medium.com/@Ostoyae/ideadog-back-end-overview-a0d66d780bea)
- [Building a Modern React Web Application — The IdeaDog Front-End](https://medium.com/@bdov_/building-a-modern-react-web-application-the-ideadog-front-end-bc56dd3ca4b6)

## Tech Stack :poodle:

<p align="center">
  <img src="https://github.com/bdbaraban/ideadog/blob/master/assets/ideadog-stack.png"
       alt="IdeaDog Tech Stack"
       width="600"
  />
</p>

### Dependencies :couple:

**Front-End**:

| Tool/Library                                                                       | Version |
| ---------------------------------------------------------------------------------- | ------- |
| [TypeScript](https://www.typescriptlang.org/)                                      | ^3.5.3  |
| [React](https://reactjs.org/)                                                      | ^16.8.6 |
| [Material UI](https://material-ui.com/)                                            | ^4.2.1  |
| [Navi](https://frontarm.com/navi/en/)                                              | ^0.13.3 |
| [Auth0 JS](https://www.npmjs.com/package/auth0-js)                                 | ^9.11.2 |
| [@dwqs/react-virtual-list](https://www.npmjs.com/package/@dwqs/react-virtual-list) | ^1.0.0  |
| [clipboard-copy](https://www.npmjs.com/package/clipboard-copy)                     | ^3.0.0  |

View the complete list of front-end dependencies in the corresponding [package.json](./frontend/package.json).

**Back-End**:

| Tool/Library                           | Version |
| -------------------------------------- | ------- |
| [Rust](https://www.rust-lang.org/)     | 1.35    |
| [Actix](https://actix.rs/actix/actix/) | 0.7     |
| [ArangoDB](https://www.arangodb.com/)  | ^3.4    |

View the complete list of back-end dependencies in the corresponding [Cargo.toml](https://github.com/Ostoyae/ideaDog_server/blob/master/app/Cargo.toml).

**Packaging/Deployment**:

| Tool/Library                      | Version  |
| --------------------------------- | -------- |
| [Node.js](https://nodejs.org/en/) | ^10.16.0 |
| [Yarn](https://yarnpkg.com/en/)   | ^1.17.3  |
| [Parcel](https://parceljs.org/)   | ^1.12.3  |
| libssl-dev                        | ^1.0     |

### Front-End :dog2:

[View the dedicated front-end README.md.](./frontend)

### Back-End :feet:

[View the dedicated back-end README.md.](./backend)

[View the source code for the back-end Rust server at Martin's dedicated submodule](https://github.com/Ostoyae/ideaDog_server).

## Authentication :key:

<p align="center">
  <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fd0.awsstatic.com%2Fpartner-network%2Fpartner-logos%2FMobile%2520Competency%2520Partner%2520Logos%2F600x400_AuthO_Logo.png&f="
       alt="Auth0 Logo"
       width="250"
  />
</p>

Passwords are no fun. IdeaDog features a passwordless user authentication process managed by [Auth0](https://auth0.com/). The process works as follows:

1. User enters email (for login) or both email + username (for signup). Front-end initially sends email/username to back-end.

   1. If logging in, and an account does not exist with the given email, back-end returns a redirect code, and user is directed to sign-up.
   2. Otherwise, back-end generates and returns a challenge token associated with the email.

2. Front-end temporarily stores challenge token in `localStorage`, then uses the Auth0 API to send a login email to the user. The login email includes a random code that user must enter to verify account.

3. Upon entering the verfication code, the user is redirected to the home page of IdeaDog. The redirect occurs on a URL hashed by Auth0 which the front-end parses to retrieve the user's Auth0 profile.

4. Front-end pulls up challenge token from `localStorage` and returns it to the back-end with the verified email. Back-end generates and returns a bearer token in the form of a cookie.

   1. After being returned to the back-end, the challenge token is cleared from `localStorage`.

5. The bearer token has been set and the user can fully acccess their profile!

## Authors :black_nib:

- **Brennan D Baraban** <[bdbaraban](https://github.com/bdbaraban)>
- **Martin Smith** <[Ostoyae](https://github.com/Ostoyae)>

## License :lock:

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
