import { makeExecutableSchema } from 'graphql-tools'
// import { addMockFunctionsToSchema } from 'graphql-tools'
import { SchemaLink } from 'apollo-link-schema'
import data from './mock-data/data'
import typeDefs from './schema.js' // TODO

const resolvers = {
  Query: {
    emails: (_, { filter = 'ALL' }) => {
      return data.emails.filter(
        e =>
          filter === 'ALL' ||
          (filter === 'READ' && e.isRead) ||
          (filter === 'UNREAD' && !e.isRead)
      )
    },
    email: (_, { id }) => data.emails.find(e => e.id === id),
  },
  Mutation: {
    updateEmail: (_, { id, ...props }) => {
      const i = data.emails.findIndex(e => e.id === id)
      if (i >= 0) {
        data.emails = [
          ...data.emails.slice(0, i),
          { ...data.emails[i], ...props },
          ...data.emails.slice(i + 1),
        ]
      }
      return data.emails[i]
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

//addMockFunctionsToSchema({ mocks, schema })
export default new SchemaLink({ schema })
