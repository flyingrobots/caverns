This document will describe each milestone. For now we only have a single milestone, but we'll add more to this document as we go.

# Athens

Baby's first milestone. Nothing fancy, just some goals to work towards.

## server

### High-level overview

All we need is a basic file server at this point so we can demonstrate the client's WebGL capabilities.

### Acceptance Critera

* Basic file server works and is capable of serving whatever the client app demands (i.e. javascript, html, game assets, et al)
* Should not produce any warnings or errors when exercising the client app.

## client

### High-level overview

The player will be able to see a tile-based world and control some sort of avatar using the keyboard.

### Acceptance Critera

* Pixi and box2d demo apps are consolidated into a single client app
* Works both 'offline' and against a live server
* Basic game engine:
    * Component-based game object system exists
    * Game object serialization to/from JSON works
    * Modules-based framework exists
* Graphics:
    * Tile-based world
    * Sprite for avatar (can be static, can be a movie clip)
    * Works in both WebGL **and** Canvas
* Physics:
    * World is created using cave data
    * Avatar can interact with dynamic bodies
    * Avatar may simulate collision with the world using box2d, or not
* Input:
    * Some kind of keyboard-based input, ghetto implementation is fine
* Gameplay
    * Avatar movement
    * Jumping
    * Double jump
    * Game world is created using generated cave data
    * Caves can be randomly generated

## workflow automation

### Overview

We wanna `rake` these tasks:

* Start the server and launch the client app
* Sync, build, and export external dependencies to `./bin`
* Deploy the client app (code, assets, dependencies) to the server's public directory

No minification. No obfuscation. No concatenation. No concept of development build vs release build for client app or server. Everything is obviously under heavy development.

### Acceptance Critera

* Starting the server is automated using a single command
* Syncing, building, and exporting external dependencies is automated with a single command
* Deploying the client app is automated using a single command
* We are happy with how the project's artifacts are organized
