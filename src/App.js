import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import EmailLink from './components/EmailLink'
import EmailSelectToggle from './components/EmailSelectToggle'
import EmailFilterButtonGroup from './components/EmailFilterButtonGroup'
import EmailViewerModal from './components/EmailViewerModal'
import SimplePagination from './components/SimplePagination'

const UPDATE_EMAIL = gql`
  mutation updateEmail($id: ID, $isRead: Boolean) {
    updateEmail(id: $id, isRead: $isRead)
  }
`

const GET_EMAIL_LIST = gql`
  query emails($filter: String!) {
    emails(filter: $filter) {
      id
      subject
      isRead
      isSelected @client
    }
  }
`

const MarkSelectedAsReadButton = ({ selectedEmails, filter, updateEmail }) => (
  <Button
    onClick={() =>
      selectedEmails.forEach(({ id }) =>
        updateEmail({
          variables: { id, isRead: true },
        })
      )
    }
    disabled={selectedEmails.length === 0}
  >
    Mark {selectedEmails.length ? selectedEmails.length : ''} as Read
  </Button>
)

const credits = (
  <Card>
    <CardTitle>Email Client Demo by Jimmy Chan</CardTitle>
    <CardBody>      
      <p>
        Implemented with reactstrap (react + bootstrap), styled-components, and
        apollo-boost. Apollo client configured for local state management. Mock
        server using graph-ql + casual-browserify.
      </p>
    </CardBody>
  </Card>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.limit = 5
    this.state = {
      filter: 'ALL',
      viewEmailId: null,
      page: 0,
    }
  }

  // EmailViewerModal toggle
  toggle = () => {
    this.setState({ viewEmailId: null })
  }

  render() {
    return (
      // Query filered list of emails
      <Query query={GET_EMAIL_LIST} variables={{ filter: this.state.filter }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error: {error.message}</p>

          // Mutation updates email isRead flag
          return (
            <Mutation
              mutation={UPDATE_EMAIL}
              refetchQueries={[
                {
                  query: GET_EMAIL_LIST,
                  variables: { filter: this.state.filter },
                },
              ]}
            >
              {updateEmail => (
                <Container>
                  {this.state.viewEmailId !== null && (
                    <EmailViewerModal
                      filter={this.state.filter}
                      emailId={this.state.viewEmailId}
                      toggle={() => {
                        updateEmail({
                          variables: {
                            id: this.state.viewEmailId,
                            isRead: true,
                          },
                        })
                        this.toggle()
                      }}
                    />
                  )}
                  <Row>
                    <Col xs={12} sm={6}>
                      <Card>
                        <CardTitle>Filter: </CardTitle>
                        <CardBody>
                          <Row>
                            <Col>
                              <EmailFilterButtonGroup
                                value={this.state.filter}
                                values={['ALL', 'UNREAD', 'READ']}
                                onChange={filter =>
                                  this.setState({ filter, page: 0 })
                                }
                              />
                            </Col>
                            <Col>
                              <MarkSelectedAsReadButton
                                selectedEmails={data.emails.filter(
                                  e => e.isSelected
                                )}
                                filter={this.state.filter}
                                updateEmail={updateEmail}
                              />
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                      {credits}
                    </Col>
                  </Row>
                  <Row className="EmailList">
                    <Col>
                      <Card style={{ padding: '1rem' }}>
                        {data.emails
                          .slice(
                            this.state.page * this.limit,
                            this.state.page * this.limit + this.limit
                          )
                          .map(email => (
                            <Card key={email.id}>
                              <CardBody>
                                <FormGroup check>
                                  <Label check>
                                    <EmailSelectToggle email={email} />
                                    <EmailLink
                                      email={email}
                                      onClick={() =>
                                        // Launch EmailViewModal
                                        this.setState({ viewEmailId: email.id })
                                      }
                                    />
                                  </Label>
                                </FormGroup>
                              </CardBody>
                            </Card>
                          ))}
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={{ size: 2, offset: 5 }}>
                      <SimplePagination
                        page={this.state.page}
                        pages={Math.ceil(data.emails.length / this.limit)}
                        onChange={({ page }) => this.setState({ page })}
                      />
                    </Col>
                  </Row>
                </Container>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default App
