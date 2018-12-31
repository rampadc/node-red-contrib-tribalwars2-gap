# Tribal Wars 2 - Graphical Attack Planner

A visual tool for wiring commands for Tribal Wars 2, runs on Node-RED. Short-named tw2-gap, it is a collection of nodes built specifically for the purpose of organizing attack and support commands for the game.

## Quick Start

To run locally,

1. Install [Node.js](https://nodejs.org/en/download/).
2. cd into this project's directory
3. Run `npm install` to install app's depencies
4. Run `npm run build` to build Node-RED. You might need to install grunt-cli by running `npm install -g grunt-cli`.
5. Run `npm start` to run the app
6. Navigate to http://localhost:1880.

## Docker 

To run with latest NodeJS image, run

```$xslt
docker-compose -f docker/full/docker-compose.yml up 
```

To use the Alpine base image, run

```$xslt
docker-compose -f docker/slim/docker-compose.yml up 
```

The default username and password is set to `admin`/`password`. You can change this in the corresponding Compose files.


## Demo screenshots

![Attack demo](examples/Demo-attack.png)

![Support demo](examples/Demo-support.png)

## License

The following license applies to the custom nodes in this repository.

```
Copyright 2018-2019 Cong Nguyen

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
```