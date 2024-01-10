const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id: ID!
        username: String!
        surname: String!
        password: String
    }

    input UserData {
        username: String
        surname: String
    }

    type RootMutation {
        updateUser(id: ID!, userInput: UserData): User!
        changePassword(id: ID!, oldPassword: String!, newPassword1: String!, newPassword2: String!): User!
    }

    type RootQuery {
        hello: String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
