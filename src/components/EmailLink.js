import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a.attrs(({ email }) => ({
  children: email.subject,
}))`
  color: ${({ email }) => (email.isRead ? 'black' : 'green')};
  font-weight: ${({ email }) => (email.isRead ? 'normal' : 'bold')};
`

const EmailLink = props => (
  <StyledLink href="#" children={props.email.subject} {...props} />
)

export default EmailLink
