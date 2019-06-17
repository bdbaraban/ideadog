# IdeaDog Server
[![Build status](https://ci.appveyor.com/api/projects/status/jramqn9wwm2qk13j/branch/master?svg=true)](https://ci.appveyor.com/project/Ostoyae/ideadog-server/branch/master)

## Description :bulb:

*Currently the back-end and [front-end](https://github.com/bdbaraban/ideadog) of IdeaDog live in seperate repos, to reduce project clutter.*

IdeaDog is a social web application for sharing ideas. We've all had those sudden bursts of inspiration where we go - "wow, that is simply a _great_ idea" - but know we will never follow up. Now, instead of losing those ideas, share them with the world!

Why statically-typed, you ask? Well, the front-end of the application is built in React, with TypeScript, while the back-end runs on Rust. TypeScript + Rust = The Ultimate Statically-Typed Web App!

Development of IdeaDog has only just begun. Stay tuned, there is much, much, much more to come!

## Usage

Server [environment](#env) must be set
To compile and run Idea:dog: Server (in release), just run the the command below.
```
# from root folder.
cargo run --release --package=ideadog-server
```
Or alternativly you can goto the [release page](https://github.com/Ostoyae/ideaDog_server/releases) to get pre-/RC binaray.

### Required dep *nix

|package name| version |
| ---------- | ------- |
| libssl-dev | ^1.0 |


## Dependencies :couple:

**Back-End**:

| Tool/Library     | Version    |
| ---------------- | ---------- |
| [Rust](https://www.rust-lang.org/) | 1.35 |
| [Actix](https://actix.rs/actix/actix/) | 0.7 |
| [ArangoDB](https://www.arangodb.com/) | ^3.4 |

View the complete list of back-end dependencies in the corresponding [Carog.toml](./app/Cargo.toml).
 
**Front-End**:
[Source](https://github.com/bdbaraban/ideadog)

| Tool/Library             | Version |
| ------------------------ | ------- |
| [TypeScript](https://www.typescriptlang.org/) | ^3.5.1  |
| [React](https://reactjs.org/) | ^16.8.6 |
| [Material UI](https://material-ui.com/) | ^4.0.2  |
| [Navi](https://frontarm.com/navi/en/) | ^0.12.7 |
| [@dwqs/react-virtual-list](https://www.npmjs.com/package/@dwqs/react-virtual-list) | ^1.0.0  |
| [clipboard-copy](https://www.npmjs.com/package/clipboard-copy) | ^3.0.0  |

View the complete list of front-end dependencies in the corresponding [package.json](./frontend/package.json).


## ENV

The easyiest way to set the enviorment for this project/server is to use a .env

```
# API Server
HOST=0.0.0.0
PORT=5000

# Database
DB_NAME="test_db"
DB_ACCOUNT="test_account"
DB_PASSWORD="test"
DB_HOST="localhost"
DB_PORT=8529

# Threads
ARBITER_THREAD=1
WORKER=2

# Auth
APPROVEAPI_TEST_KEY='Aquire one from [approveAPI.com]'
APPROVEAPI_LIVE_KEY='Aquire one from [approveAPI.com]'
REDIRECT_URL="https://ideaDog.site"
```

