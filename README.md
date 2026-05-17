# The Global Kitchen API

A RESTful API for a digital cookbook built with Node.js, Express, and MongoDB Atlas.

## Tech Stack

- **Runtime:** Node.js v24.14.1
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Configuration:** dotenv for environment variables

## Features

- Create, Read, Update, Delete (CRUD) operations for recipes
- Category filtering for GET /recipes endpoint
- Global error handling with proper HTTP status codes
- MongoDB Atlas cloud database integration
- Schema validation with indexing on frequently queried fields
- 3-Tier Architecture (Routes → Controllers → Services → Models)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/recipes | Retrieve all recipes (supports ?category=value filter) |
| GET | /api/recipes/:id | Retrieve a single recipe by ID |
| POST | /api/recipes | Create a new recipe |
| PATCH | /api/recipes/:id | Update specific fields of a recipe |
| DELETE | /api/recipes/:id | Delete a recipe |
| GET | /api/health | Health check endpoint |

## Installation & Setup

1. Clone the repository:
   git clone https://github.com/saboh-stanley/the_global_kitchen_api.git

2. Navigate to project folder:
   cd the_global_kitchen_api

3. Install dependencies:
   npm install

4. Create a .env file in the root directory and add:
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string

5. Start the server:
   node server.js

## Sample Recipe JSON

{
  "title": "Spaghetti Carbonara",
  "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan cheese", "Black pepper"],
  "instructions": "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all.",
  "cookingTime": 20,
  "difficulty": "Medium",
  "category": "Italian"
}

## License

ISC