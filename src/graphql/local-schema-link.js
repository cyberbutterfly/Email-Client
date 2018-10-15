import { makeExecutableSchema } from 'graphql-tools'
import { SchemaLink } from 'apollo-link-schema'
import gql from 'graphql-tag'

const resolvers = {
  Mutation: {
    toggleTodo: (_, { id }, { cache }) => {
      // const id = `Email:${id}`
      const fragment = gql`
        fragment completeTodo on TodoItem {
          isSelected
        }
      `
      const email = cache.readFragment({ fragment, id })
      const data = { ...email, isSelected: !email.isSelected }

      cache.writeFragment({ fragment, id, data })
      return null
    },
    selectEmail: (_, { id }, { cache, data }) => {
      cache.writeData({ data: { id } })
      return null
    },
    toggleSelectedEmails: (_, { id }, { cache, data }) => {
      cache.writeData({ data: { id } })
      return null
    },
    updateFilter: (_, { filter }, { cache }) => {
      cache.writeData({ data: { filter } })
      return null
    },
    updatePage: (_, { page }, { cache }) => {
      cache.writeData({ data: { page } })
      return null
    },
    viewEmailId: (_, { viewEmailId = null }, { cache }) => {
      cache.writeData({ data: { viewEmailId } })
      return null
    },
  },
}

const typeDefs = `
  {
  }
`

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

export default new SchemaLink({ schema })
