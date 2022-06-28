FROM node:16-alpine AS build

# Safer workdir@
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY ./package*.json ./
# Install dependencies
RUN npm ci
# Copy source code
COPY . .

# Build static version of the app
RUN npm run build
# Remove unused dev packages
RUN npm prune --production

# Second stage
FROM node:16-alpine

#Set safer workdir
WORKDIR /usr/src/app

# Copy env variables
COPY --from=build /usr/src/app/.env.* ./

# Copy necessary files for the production optimized build
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/public ./public

EXPOSE 3000
# Command is npm run start
CMD npm run start