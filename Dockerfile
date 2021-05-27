FROM node:lts
MAINTAINER Yuuki-Sakura <admin@zy.ci>

WORKDIR .

RUN npm install -g pnpm
RUN pnpm install

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 4000
EXPOSE 3000

CMD pnpm run start