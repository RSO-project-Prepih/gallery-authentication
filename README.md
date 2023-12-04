CI status: [![CircleCI](https://dl.circleci.com/status-badge/img/gh/RSO-project-Prepih/gallery-authentication/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/RSO-project-Prepih/gallery-authentication/tree/main)

## Endpoints

### Auth

- <b>POST</b> /auth/login - login
    - body example (JSON):
    - {
        "username": "jakob",
        "password": "123123"
    } 
- <b>POST</b> /auth/register - register new user
    - body example (JSON):
    - {
    "username": "jakob",
    "surname": "dekleva",
    "password": "123123"
}
- <b>GET</b> /auth/users - get all users in db

### Health
- <b>GET</b> /live - liveness check
- <b>GET</b> /ready - readiness check

