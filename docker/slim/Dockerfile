FROM node:alpine

COPY . /tw2-gap/

RUN apk add g++ make python git openssh-keygen && cd tw2-gap && sh /tw2-gap/setup.sh && apk del g++ make python

# Using project feature, do not need volume since user will be saving flows in respective repos
EXPOSE 1880

WORKDIR /tw2-gap/node-red
CMD ["npm", "start"]