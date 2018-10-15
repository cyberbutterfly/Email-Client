import React from 'react'
import { Modal, ModalHeader, ModalBody, Card } from 'reactstrap'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_EMAIL_VIEW = gql`
  query emailById($emailId: ID!) {
    email(id: $emailId) {
      subject
      body
    }
  }
`

export default ({ filter, emailId, toggle }) => (
  <Query query={GET_EMAIL_VIEW} variables={{ emailId }}>
    {({ client, loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :( {JSON.stringify(error)}</p>
      return (
        <Modal isOpen={true}>
          <ModalHeader toggle={toggle}>
            {emailId !== null && data.email.subject}
          </ModalHeader>
          <ModalBody>
            <Card>{emailId !== null && data.email.body}</Card>
          </ModalBody>
        </Modal>
      )
    }}
  </Query>
)
