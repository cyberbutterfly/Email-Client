import React from 'react'
import { Input } from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SET_EMAIL_SELECT = gql`
  mutation setEmailSelect($id: ID!, $isSelected: Boolean!) {
    setEmailSelect(id: $id, isSelected: $isSelected) @client
  }
`

export default ({ email: { id, isSelected } }) => (
  <Mutation
    mutation={SET_EMAIL_SELECT}
    variables={{ id, isSelected: !isSelected }}
  >
    {setEmailSelect => (
      <Input type="checkbox" checked={isSelected} onChange={setEmailSelect} />
    )}
  </Mutation>
)
