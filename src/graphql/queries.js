const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, PostType } = require('./types')
const { User, Post } = require('../models')

const users = {
    type: new GraphQLList(UserType),
    description: 'Query all users in the database',
    resolve(parent, args) {
        return User.find()
    }
}

const user = {
    type: UserType,
    description: 'Query user by id',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

const postById = {
    type: PostType,
    description: 'Post querry by id',
    args: {
        id: { type: GraphQLString }
    },
    async resolve(parent, args) {
        return Post.findById(args.id)
    }
}

module.exports = { users, user, postById }