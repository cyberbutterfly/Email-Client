import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'

export default ({ onChange, value, values }) => (
  <ButtonGroup vertical>
    {values.map(filter => (
      <Button
        key={filter}
        onClick={e => {
          e.preventDefault()
          onChange(filter)
        }}
        color={value === filter ? 'success' : 'primary'}
      >
        {filter}
      </Button>
    ))}
  </ButtonGroup>
)
