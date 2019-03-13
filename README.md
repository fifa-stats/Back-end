## Backend API

### Auth Token Payload

When the user login or signup, a JWT token will be created and returned to client.  

The JWT payload will look like this:

```
{
  id: user.id,
  username,
  email: user.email
};
```

### User Routes

#### Register

POST `api/users/signup`

Registers new user.

Request body should look like this:

```
{
  "fname": "user first name",
  "lname": "user last name",
  "email": "user@gmail.com",
  "pass": "password"
}
```

`fname`: String, required, min 2 characters, max 30 characters

`lname`: String, required, min 2 characters, max 30 characters

`pass`: String, required, min 6 characters

`email`: Email, required, must be unique (should be unique) 

Response:

```
{
  "token": "Bearer (token)"
}
```

#### Login

POST `api/users/login`

Logs user in.

Request body should look like this:

```
{
  "email": "user@gmail.com",
  "pass": "password"
}
```

`pass`: String, required

`email`: Email, required

Response:

```
{
  "token": "Bearer (token)"
}
```

### Teams Routes

#### Get all custom teams of current user

GET `api/teams`

**Requires:** Authorization

Retrieves a list of teams user created

`user id` is extracted from header Authorization Token


#### Get all default teams

GET `api/teams/default`

Retrieves a list of default teams


#### Get players of a custom team

GET `api/teams/:team_id`

**Requires:** Authorization

Retrieves a list of player from a specific custom teams

`user id` is extracted from header Authorization Token

`team id` is extracted from url parameter


#### Create new custom team

POST `api/teams`

**Requires:** Authorization

Create a custom team for current user

Request body should look like this:

```
{
  "name": "Team Name"
}
```

`name`: String, required

Response:

```
{
  "id": "New team id",
  "name": "New team name"
}
```


#### Copy a default team

POST `api/teams/copy`

**Requires:** Authorization

Create a copy of a default team for current user

**Note** All players from the default team will be copied as well

**Note** User should choose a default team from the default team list

Request body should look like this:

```
{
  "name": "Team Name"
}
```

`name`: String, required

Response:

```
{
  "id": "New team id",
  "name": "New team name"
}
```

#### Add a player to a custom team

POST `api/teams/:id/add`

**Requires:** Authorization

Add player to a team

Request body should look like this:

```
{
  "player_id": player_id (of player to be added)
}
```

`player_id`: Integer, 

`Team Id` is extracted from url params

Response:

```
{
  {message: "Player added successfully"}
}
```

#### Delete a custom team

DELETE `api/teams/:team_id`

**Requires:** Authorization

Delete a team

`team_id` is extracted from url params

Response:

```
{
  {message: "Team deleted successfully"}
}
```

#### Delete a player from a custom team

DELETE `api/teams/:team_id/delete/:player_id`

**Requires:** Authorization

Delete a player from a team

`team_id` is extracted from url params

`player_id` is extracted from url params

Response:

```
{
  {message: "Player deleted successfully"}
}
```

### Players Routes

#### Fetch players

GET `api/players/`

Retrieve all players from original dataset

Response: 

Will be an array of player objects
