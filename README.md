# News Aggregator

## Project Description

This News Aggregator is a React-based web application built with Vite that pulls articles from various sources and displays them in a clean, easy-to-read format. The project was developed as part of a Frontend Take-Home Challenge, focusing on creating a user-friendly interface for accessing and personalizing news content.

## Features

1. **Article Search and Filtering**: Users can search for articles by keyword and filter results by date, category, and source.
2. **Personalized News Feed**: Users can customize their news feed by selecting preferred sources and categories.
3. **Mobile-Responsive Design**: The website is optimized for viewing on various devices, including mobile phones and tablets.

## Technologies Used

- React.js
- Vite (for fast development and optimized builds)
- Material-UI for component styling
- Axios for API requests
- React Router for navigation
- Local Storage for saving user preferences

## Data Sources

This project integrates with the following news APIs:

1. The Guardian API
2. New York Times API
3. NewsAPI.org

## Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- Docker

### Running with Docker

1. Clone the repository:
   ```
   git clone https://github.com/your-username/news-aggregator.git
   cd news-aggregator
   ```

2. Build the Docker image:
   ```
   docker build -t vite-react-app .
   ```

3. Run the Docker container:
   ```
   docker run -p 8080:80 -d --name vite-react-container vite-react-app
   ```

4. Open your browser and navigate to `http://localhost:8080` to view the application.

### Development Setup

To run the application in development mode:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Building for Production

To create a production build:

```
npm run build
```

This will create a `dist` directory with the production-ready files.

## Docker Commands

### Check running containers
```
docker ps
```

### View container logs
```
docker logs vite-react-container
```

### Stop the container
```
docker stop vite-react-container
```

### Remove the container
```
docker rm vite-react-container
```

### Remove the Docker image
```
docker rmi vite-react-app
```

## Project Structure

- `/src`: Source code
    - `/api`: Modules for integrating with different news APIs
    - `/components`: React components organized by feature or page
    - `/context`: React Context API setup for global state management
    - `/models`: TypeScript interfaces and types
    - `/types`: Additional TypeScript type definitions
    - `/utils`: Utility functions that can be used across the application
- `/public`: Static files
- `vite.config.js`: Vite configuration
- `Dockerfile`: Docker configuration for containerization
- `package.json`: Project dependencies and scripts

This structure promotes a clear separation of concerns, making the project easier to navigate, maintain, and scale. The use of TypeScript and modular component structure indicates a focus on code quality and maintainability.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
