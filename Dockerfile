# Use the official Node.js 20 image as the base image
FROM node:20-alpine

# Setup env variabless for yarn
ENV NODE_ENV=production YARN_VERSION=4.3.1

# update dependencies, add libc6-compat and dumb-init to the base image
RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init

# install and use yarn 4.x
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./
COPY .yarn ./.yarn

# Install the dependencies using Yarn
RUN yarn install --immutable

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Expose the port that the application will listen on
EXPOSE 4000

# Start the application
CMD ["yarn", "start"]
