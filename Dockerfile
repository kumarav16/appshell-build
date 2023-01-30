# stage 0 : create app
FROM node:14-alpine3.13 as build-app
WORKDIR /appfolder
COPY ./ /appfolder
RUN npm install
RUN npm run-script build
RUN rm /appfolder/server/build/package-lock.json
# client obfuscation
RUN node create-config.js
RUN npm run defend
RUN npm run obfuscate
RUN npm run replace-obfuscated-files
# server obfuscation
RUN npm run create-config-server
RUN npm run defend
RUN npm run obfuscate
RUN npm run replace-obfuscated-files-server


#stage 1 : use only required files
#FROM node:14-alpine3.13
FROM gcr.io/distroless/nodejs:14
WORKDIR /app-shell
COPY --from=build-app /appfolder/server/build ./server/build
COPY --from=build-app /appfolder/server/node_modules ./server/node_modules
COPY --from=build-app /appfolder/server/package.json ./server/package.json
COPY preemptive-jsdefender-webpack-plugin-2.3.0.tgz /server
COPY preemptive-jsdefender-cli-2.3.0.tgz /server
COPY preemptive-jsdefender-core-2.3.0.tgz /server
COPY --from=build-app /appfolder/client/build ./client/build
COPY --from=build-app /appfolder/client/src/assets ./client/src/assets
COPY --from=build-app /appfolder/client/node_modules ./client/node_modules
COPY --from=build-app /appfolder/package.json ./package.json

#  The image developer can create additional users. Those users are accessible by name. When passing a numeric ID, the user does not have to exist in the container.
# 0 is root, range 0-2147483647
USER 3876334
#If not in range, docker: Error response from daemon: uids and gids must be in range 0-2147483647 : https://docs.docker.com/engine/reference/run/#user

EXPOSE 8000
#use below for node
# CMD [ "npm", "start" ]
#use this for distroless
CMD [ "server/build/src/server.js" ]

# test for non-root alpine
    # code to remove user except root|nobody
    # RUN sed -i -r "/^(root|nobody)/!d" /etc/passwd /etc/shadow /etc/group \
    #     && sed -i -r 's#^(.*):[^:]*$#\1:/sbin/nologin#' /etc/passwd

    # build image with USER nobody
    # run docker image
    # Docker ps -a : this gives you image id
    # docker exec -it 691f35b73ec8 /bin/sh
    # npm i docker : permission error
    # docker exec -u 0 -it 691f35b73ec8 /bin/sh : -u 0 sets root user
    # npm i docker : success

    # build image with USER root
    # run docker image
    # Docker ps -a : this gives you image id
    # docker exec -it 691f35b73ec8 /bin/sh
    # npm i docker : sucess
    # docker exec -u 1 -it 691f35b73ec8 /bin/sh : -u 1 sets user as 1 which is not default(0)
    # npm i docker : fail

# build image on distroless : no folder structure : cant test as above

# USER node(!0) in alpine is non-root
# USER 1000(!0) in distroless is non root
# root === 0
