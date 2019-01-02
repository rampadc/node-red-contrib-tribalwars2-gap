FROM node:alpine AS base

EXPOSE 1880

RUN mkdir -p /tw2-gap

FROM base AS dependencies
COPY . /tw2-gap/
RUN apk add g++ make python git openssh-keygen && cd tw2-gap && npm i -g grunt-cli && sh /tw2-gap/setup.sh && apk del g++ make python

FROM base AS release
COPY --from=dependencies /tw2-gap/node-red /tw2-gap/node-red
COPY ./nodes /tw2-gap/node-red/nodes

WORKDIR /tw2-gap/node-red
CMD ["npm", "start"]


