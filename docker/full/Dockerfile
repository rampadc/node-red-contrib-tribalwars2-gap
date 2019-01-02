FROM node:latest as base
EXPOSE 1880

RUN mkdir -p /tw2-gap

FROM base AS dependencies
RUN npm i -g grunt-cli
COPY ./ /tw2-gap/
RUN cd tw2-gap && sh /tw2-gap/setup.sh

FROM base AS release
COPY --from=dependencies /tw2-gap/node-red /tw2-gap/node-red
COPY ./nodes /tw2-gap/node-red/nodes

WORKDIR /tw2-gap/node-red
CMD ["npm", "start"]