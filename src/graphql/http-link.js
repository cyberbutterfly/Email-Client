import { HttpLink } from 'apollo-link-http'

export default new HttpLink({
  uri: 'https://api.example.com/graphql', // TODO point to server graphql api endpoint
})
