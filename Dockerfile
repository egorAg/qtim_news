#set node version
FROM node:18.16.1

#set workdir
WORKDIR /api

#copy project files
COPY ./ ./

RUN yarn remove bcrypt

#install packages from package.json
RUN yarn

#build project for static and node_modules
RUN yarn run build

EXPOSE 5001
ENTRYPOINT ["yarn"]
CMD ["run", "start"]