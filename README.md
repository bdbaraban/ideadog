<h1 align="center">IdeaDog</h1>
<p align="center">
  A [statically-typed] social ideas platform.
</p>

<p align="center">
  <img src="https://github.com/bdbaraban/ideadog/blob/master/assets/logo.png"
       alt="IdeaDog logo"
  />
</p>

## Description :bulb:

IdeaDog is a social web application for sharing ideas. We've all had those sudden bursts of inspiration where we go - "wow, that is simply a _great_ idea" - but know we will never follow up. Now, instead of losing those ideas, share them with the world!

Why statically-typed, you ask? Well, the front-end of the application is built in React, with TypeScript, while the back-end runs on Rust. TypeScript + Rust = The Ultimate Statically-Typed Web App!

We are hard at work putting the finishing touches on IdeaDog. Stay tuned, there is much more to come!

## Medium Blog Posts :newspaper:

For a more in-depth description of IdeaDog as well as an overview of its tech stack and development process, we have written a series of articles on Medium. You can read them at the links below:

* [Introducing IdeaDog — A \[Statically-Typed\] Social Ideas Platform](https://medium.com/@bdov_/introducing-ideadog-a-statically-typed-social-ideas-platform-aeb3a6dcf04f)
* [IdeaDog Back-End Overview](https://medium.com/@Ostoyae/ideadog-back-end-overview-a0d66d780bea)
* [Building a Modern React Web Application — The IdeaDog Front-End](https://medium.com/@bdov_/building-a-modern-react-web-application-the-ideadog-front-end-bc56dd3ca4b6)

## Dependencies :couple:

**Front-End**:

| Tool/Library             | Version |
| ------------------------ | ------- |
| [TypeScript](https://www.typescriptlang.org/) | ^3.5.2  |
| [React](https://reactjs.org/) | ^16.8.6 |
| [Material UI](https://material-ui.com/) | ^4.1.1  |
| [Navi](https://frontarm.com/navi/en/) | ^0.12.8 |
| [Auth0 JS](https://www.npmjs.com/package/auth0-js) | ^9.10.4 |
| [@dwqs/react-virtual-list](https://www.npmjs.com/package/@dwqs/react-virtual-list) | ^1.0.0  |
| [clipboard-copy](https://www.npmjs.com/package/clipboard-copy) | ^3.0.0  |

View the complete list of front-end dependencies in the corresponding [package.json](./frontend/package.json).

**Back-End**:

| Tool/Library     | Version    |
| ---------------- | ---------- |
| [Rust](https://www.rust-lang.org/) | 1.35 |
| [Actix](https://actix.rs/actix/actix/) | 0.7 |
| [ArangoDB](https://www.arangodb.com/) | ^3.4 |

View the back-end server [source code](https://github.com/Ostoyae/ideaDog_server)

**Packaging/Deployment**:

| Tool/Library     | Version    |
| ---------------- | ---------- |
| [Docker](https://www.docker.com/) | ^18.09.3   |
| [Docker Compose](https://docs.docker.com/compose/) | ^1.23.2 |
| [Yarn](https://yarnpkg.com/en/) | ^1.16.0    |
| [Parcel](https://parceljs.org/) | ^1.12.3    |

## Front-End :dog2:

Features:
* Hooks hooks hooks! IdeaDog features _zero_ traditional React components.
* List virtualization. I tried combinations of five different list virtualization libraries before I discovered [React Virtual List](https://www.npmjs.com/package/@dwqs/react-virtual-list). Check it out!
* Asynchronous data fetching. Did I mention that I like hooks? Do yourself a favor and give [Navi](https://frontarm.com/navi/en/) a try.

Routes:
* `/:sort?tags`: The home page of IdeaDog, filters displayed ideas by `:sort` and `?tags`.
* `/idea/:id`: Displays a specific idea with id `:id`.
* `/user/:id`: Displays a page for a user with id `:id`.

## Back-End :feet:

Features:
* NoSQL, but relationships? [ArangoDB](https://www.arangodb.com/) is pretty awesome.

API:
* `GET /api`: Displays a friendly message.
* `GET /api/ideas`: Fetches all ideas.
* `GET /api/ideas/bright`: Fetches all ideas, sorted by brightness [upvotes / (upvotes + downvotes)]
* `POST /api/idea`: Creates a new idea. Requires Auth
* `GET /api/idea/{id}`: Fetches an idea with id `{id}`.

View the complete API documentation at [this Postman link](https://documenter.getpostman.com/view/253532/S1TZxahn?version=latest).

## Authors :black_nib:

* __Brennan D Baraban__ <[bdbaraban](https://github.com/bdbaraban)>
* __Martin Smith__ <[Ostoyae](https://github.com/Ostoyae)>

## License :lock:

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
