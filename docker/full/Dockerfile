FROM node:latest

RUN mkdir -p /tw2-gap
COPY ../.. /tw2-gap/

RUN cd tw2-gap && sh /tw2-gap/setup.sh

# Using project feature, do not need volume since user will be saving flows in respective repos
EXPOSE 1880

WORKDIR /tw2-gap/node-red
CMD ["npm", "start"]