# IdeaDog - Back-End
[![Build status](https://ci.appveyor.com/api/projects/status/jramqn9wwm2qk13j/branch/master?svg=true)](https://ci.appveyor.com/project/Ostoyae/ideadog-server/branch/master)

The back-end server and RESTful API of IdeaDog, built in Rust with an Actix server and ArangoDB database.

_Currently the back-end and [front-end](https://github.com/bdbaraban/ideadog/frontend) of IdeaDog live in seperate repos, to reduce project clutter._

## Medium Blog Article :newspaper:

Read my dedicated Medium article discussing the back-end at the link below:

[IdeaDog Back-End Overview](https://medium.com/@Ostoyae/ideadog-back-end-overview-a0d66d780bea)

## Features :open_mouth:

* **NoSQL, but relational querying?** [ArangoDB](https://www.arangodb.com/) is pretty awesome.

## API :round_pushpin:

View the complete API documentation at [this Postman link](https://documenter.getpostman.com/view/253532/S1TZxahn?version=latest).

## Dependencies :couple:

| Tool/Library     | Version    |
| ---------------- | ---------- |
| [Rust](https://www.rust-lang.org/) | 1.35 |
| [Actix](https://actix.rs/actix/actix/) | 0.7 |
| [ArangoDB](https://www.arangodb.com/) | ^3.4 |

View the complete list of back-end dependencies in the corresponding [Cargo.toml](https://github.com/Ostoyae/ideaDog_server/blob/master/app/Cargo.toml).

**Packaging/Deployment**:

| Tool/Library | Version |
| ---------- | ------- |
| libssl-dev | ^1.0 |

## Usage :running:

Server [environment](#env) must be set
To compile and run Idea:dog: Server (in release), just run the the command below.
```
# from root folder.
cargo run --release --package=ideadog-server
```
Alternatively, go to the [release page](https://github.com/Ostoyae/ideaDog_server/releases) to get the pre-/RC binary.

### ENV

Assuming the above dependencies have been installed, the easiest way to set the environment for this project/server is to use a `.env` file.

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
```

## Author :black_nib:

* __Martin Smith__ <[Ostoyae](https://github.com/Ostoyae)>
