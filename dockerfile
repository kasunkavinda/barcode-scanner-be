# Use Node.js base image
FROM node:21

# Set working directory
WORKDIR /usr/src/app

# Copy only the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build the NestJS app
RUN pnpm build

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["pnpm", "start:prod"]
