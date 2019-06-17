# IdeaDog Server
[![Build status](https://ci.appveyor.com/api/projects/status/jramqn9wwm2qk13j/branch/master?svg=true)](https://ci.appveyor.com/project/Ostoyae/ideadog-server/branch/master)

## Description :bulb:

*Currently the back-end and [front-end](https://github.com/bdbaraban/ideadog) of IdeaDog live in seperate repos, to reduce project clutter.*

## Usage

Server [environment](#env) must be set
To compile and run Idea:dog: Server (in release), just run the the command below.
```
# from root folder.
cargo run --release --package=ideadog-server
```
Alternatively, go to the [release page](https://github.com/Ostoyae/ideaDog_server/releases) to get the pre-/RC binary.

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

View the complete list of back-end dependencies in the corresponding [Cargo.toml](./app/Cargo.toml).
 
## ENV

The easiest way to set the environment for this project/server is to use a `.env` file.

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

