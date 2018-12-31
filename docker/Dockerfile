FROM node:alpine as base

# Home directory for Node-RED application source code.
RUN mkdir -p /usr/src/node-red


#
# ---- Dependencies ----
FROM base AS dependencies

# Directory to perform installation
RUN mkdir -p /build

# required to use apk
USER root

WORKDIR /build
COPY . /build/

# ensure there are no node_modules loaded
RUN rm -rf /build/node_modules

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk add --no-cache g++ make python
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install
RUN npm audit fix
RUN npm install -g grunt-cli
# build into public folder
RUN grunt release

# remove bundle when done
RUN apk del g++ make python

#
# ---- Release ----
# Environment variable holding file path for flows configuration
FROM base AS release

# Install Git to use Node-RED new project feature
USER root
RUN apk add --no-cache git

WORKDIR /usr/src/node-red
COPY --from=dependencies /build/.dist/node-red /usr/src/node-red/
COPY --from=dependencies /build/prod_node_modules /usr/src/node-red/node_modules

# Add node-red user so we aren't running as root.
RUN adduser -h /usr/src/node-red -D -H node-red \
    && chown -R node-red:node-red /usr/src/node-red

USER node-red

# Using project feature, do not need volume since user will be saving flows in respective repos
EXPOSE 1880

ENV FLOWS=flows.json

CMD ["npm", "start"]