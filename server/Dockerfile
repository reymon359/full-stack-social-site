FROM node:12.18.2

# Create app directory
RUN mkdir -p /usr/src/graphql-api
WORKDIR /usr/src/graphql-api

# Install app dependencies
COPY ./ ./
RUN npm install

CMD ["/bin/bash"]