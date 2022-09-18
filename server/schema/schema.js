const Project = require("../models/Project");
const Client = require("../models/Client");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID }, // When someone queries Client type and what to query a particular client, then I expect them to pass arguments (id of a client)
      },
      resolve(parent, args) {
        // resolve() is a function where we write code to get the data from a database / other sources
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find(); // return all projects by using mongoose layer function
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
