import gql from 'graphql-tag'

export const defaults = {
  filter: 'ALL',
  page: 0,
  viewEmailId: null,
  selectedEmails: [],
}

// const id = `Email:${id}`
const GET_EMAIL = gql`
  fragment completeEmail on Email {
    isSelected
  }
`

export const resolvers = {
  // add client side attribute to support UI email selection
  Email: {
    isSelected: () => {
      return false
    },
  },
  Mutation: {
    // sets email (with id) isSelected attribute
    setEmailSelect: (_, { id, isSelected, ...rest }, { cache }) => {
      const fragment = GET_EMAIL
      const email = cache.readFragment({ fragment, id })
      const data = { ...email, isSelected }

      cache.writeFragment({ fragment, id, data })
      return null
    },
  },
}
