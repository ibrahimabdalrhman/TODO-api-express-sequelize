# TODO API Express Sequelize

## Usage:

- Install dependencies:` npm install`
- Configure environment variables in `config.env`.
- Start the server: `npm start`



##API Endpoints:
- ` /api/v1/tasks` : Task management (Add, List, Get, Edit, Delete, Complete).
- `/api/v1/users` : User-related (Registration, Login).
- `/api/v1/auth` : Authentication (Login, signup).

## Example Code:
```javascript
// Adding a task
app.post("/api/v1/tasks", addTask);

// Listing all tasks
app.get("/api/v1/tasks", allTasks);

// Getting a specific task
app.get("/api/v1/tasks/:id", getTask);

// Editing a task
app.put("/api/v1/tasks/:id", editTask);

// Deleting a task
app.delete("/api/v1/tasks/:id", deleteTask);

// Completing a task
app.put("/api/v1/tasks/:id/complete", completeTask);





```

## Note:
- MySQL database required.
- Customize Sequelize models for User entity.
- Secure sensitive data before production.
- Explore, customize, and extend as needed.
 
