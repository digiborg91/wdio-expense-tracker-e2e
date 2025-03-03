# Use Node.js as the base image for the test runner
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Run tests when the container starts
CMD ["npx", "wdio", "run", "wdio.conf.ts"]
