## Development

### Setting Up the Local Environment

1. Ensure you have Node installed, version 18.8 or higher
2. Navigate to the directory with `cd server`
3. Install the dependencies using `yarn install`
4. Set environment variables in the `.env` file, following the example in `.env.example`

### Running Locally

1. Launch Payload CMS in development mode using `yarn dev`. For production mode test use `yarn build` then `yarn serve`
2. The API will be accessible at [http://localhost:3000/api](http://localhost:3000/api)
3. The admin panel will be available at [http://localhost:3000/admin](http://localhost:3000/admin)

## Production

### Setting Up the Production Environment

1. Navigate to the directory with `cd server`
2. Set environment variables in the `.env` file, following the example in `.env.example`
3. Build the container with `docker build -t wtracker-image .`

### Running in Production

1. Start the container with `docker run -d -p 3000:3000 --name wtracker-container --env-file .env wtracker-image`
2. The API will be accessible at [http://localhost:3000/api](http://localhost:3000/api)
3. The admin panel will be available at [http://localhost:3000/admin](http://localhost:3000/admin)
