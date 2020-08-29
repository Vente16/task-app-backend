# BACKEND - TASK APP

Backend task application MEAN STACK and JWT

## Installation

run the following commands:


```bash
   npm install
   npm run dev
```


the server will start running on port 4000

## ENDPOINTS

```python

 - create a user

Method: POST
Url: /api/users/
HTTP/1.1
Accept: application/json
Content-Type: application/json

Request

{.
    "name": "example name",
    "email": "email@example.com",
    "password": "1234567"
}

Successful Response

{
    "status": 1,
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}

- User authentication

Method: POST
Url: /api/auth/
HTTP/1.1
Accept: application/json
Content-Type: application/json

request

{.
    "email": "email@example.com",
    "password": "1234567"
}

Successful Response

{
    "status": 1,
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}


-- Create a task

Method: POST
Url: /api/tasks/
HTTP/1.1
Accept: application/json
Content-Type: application/json
x-auth-token: 'token here **********'
request

{
   "name": "my first task",
   "priority": 3, ##-> 1 to 30
   "dueDate": "2020-08-20"
}

Successful Response

{

    "status": 1,
    "message": "Tarea creada correctamente",
    "task": {
        "dateCreated": "2020-08-29T03:56:10.970Z",
        "_id": "5f49e3435eac290bxxxxxxxxxxx",
        "name": "my first task",
        "priority": 3,
        "dueDate": "2020-08-20T00:00:00.000Z",
        "userId": "5f49e2a15eac290b155ded9e"
    }

}

- Update task

Method: PUT
Url: /api/tasks/:id
HTTP/1.1
Accept: application/json
Content-Type: application/json
x-auth-token: 'token here **********'
request

{
   "name": "my first task upddated",
   "priority": 2, ##-> 1 to 30
   "dueDate": "2020-08-20"
}

Successful Response

{

    "status": 1,
    "message": "Tarea actulizado correctamenta",
    "task": {
        "dateCreated": "2020-08-29T03:56:10.970Z",
        "_id": "5f49e3435eac290bxxxxxxxxxxx",
        "name": "my first task upddated",
        "priority": 2,
        "dueDate": "2020-08-20T00:00:00.000Z",
        "userId": "5f49e2a15eac290b155ded9e"
    }

}


- Delete task

Method: DELETE
Url: /api/tasks/:id
HTTP/1.1
Accept: application/json
Content-Type: application/json
x-auth-token: 'token here **********'

Successful Response

{
    "status": 1,
    "message": "tarea eliminada"
}


```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)