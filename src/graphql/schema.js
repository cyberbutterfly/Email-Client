export default `
  type Email {
    id: ID!
    subject: String!
    body: String!
    isRead: Boolean!
  }

  type Query {
    emails(filter: String): [Email]!
    email(id: ID!): Email!
  }

   type Mutation {
     updateEmail(id: ID!, isRead: Boolean): Email!
   }
`
