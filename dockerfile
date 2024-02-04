# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Compile the TypeScript files to JavaScript
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD [ "node", "dist/main" ]