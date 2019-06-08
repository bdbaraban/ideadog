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

Development of IdeaDog has only just begun. Stay tuned, there is much, much, much more to come!

## Dependencies :couple:

**Front-End**:

| Tool/Library             | Version |
| ------------------------ | ------- |
| [TypeScript](https://www.typescriptlang.org/) | ^3.5.1  |
| [React](https://reactjs.org/) | ^16.8.6 |
| [Material UI](https://material-ui.com/) | ^4.0.2  |
| [Navi](https://frontarm.com/navi/en/) | ^0.12.7 |
| [@dwqs/react-virtual-list](https://www.npmjs.com/package/@dwqs/react-virtual-list) | ^1.0.0  |
| [clipboard-copy](https://www.npmjs.com/package/clipboard-copy) | ^3.0.0  |

View the complete list of front-end dependencies in the corresponding [package.json](./frontend/package.json).

**Back-End**:

| Tool/Library     | Version    |
| ---------------- | ---------- |
| [Rust](https://www.rust-lang.org/) | ? |
| [Actix](https://actix.rs/actix/actix/) | ? |
| [ArangoDB](https://www.arangodb.com/) | ^0.14.0 |

**Packaging/Deployment**:

| Tool/Library     | Version    |
| ---------------- | ---------- |
| [Docker](https://www.docker.com/) | ^18.09.3   |
| [Docker Compose](https://docs.docker.com/compose/) | ^1.23.2    |
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

## Back-End :feet:

Features:
* NoSQL, but relationships? [ArangoDB](https://www.arangodb.com/) is pretty awesome.

API:
* `GET /api`: Displays a friendly message.
* `GET /api/ideas`: Fetches all ideas.
* `GET /api/ideas/bright`: Fetches all ideas, sorted by brightness [upvotes / (upvotes + downvotes)]
* `POST /api/idea`: Creates a new idea.
* `GET /api/idea/{id}`: Fetches an idea with id `{id}`.

View the complete API documentation at [this Postman link](https://documenter.getpostman.com/view/253532/S1TZxahn?version=latest#66ec1bb7-e35b-4ecf-b796-f88dfbeb7d86).

## Authors :black_nib:

* __Brennan D Baraban__ <[bdbaraban](https://github.com/bdbaraban)>
* __Martin Smith__ <[Ostoyae](https://github.com/Ostoyae)>

## License :lock:

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.