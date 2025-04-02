# TravelMate
SoftUni ReactJS Project

A travel planning and blogging app where users create trips and share experiences.

## Overview
The project has public and private parts. The public part contains the home page, login and register pages, blog posts, and post details pages. The private part contains functionalities only accessible to authenticated users. Among these functionalities are:

- Creating, editing, and deleting blog posts (if the user is the owner)
- Liking/unliking and writing comments on blog posts (for any authenticated user)
- Planning Ascending trips, editing or deleting them, and participating in other authenticated users' trips
- Access to a profile page where users can manage their blogs, trips, liked blog posts, and trip participations

## Project Structure
The project contains two main folders:

- **client** — contains the frontend
- **server** — contains the backend

## Setup Instructions
To run the application, follow these steps:

1. Clone the repository
    ```bash git clone https://github.com/NikolaIvanov0821/TravelMate.git ```
2. Open the main project folder (containing both `client` and `server`) in Visual Studio Code.
3. Open a terminal and navigate to the `client` folder:
   ```bash cd client ```
   ```bash npm install ```
   ```bash npm run dev ```
  
4. The project will open in your browser at http://localhost:5173/.

Note: The server is hosted remotely, but it may sometimes be slow.

## The client is deployed on https://travelmate-1-fqmm.onrender.com/
Note: I am not sure if it works properly there.
