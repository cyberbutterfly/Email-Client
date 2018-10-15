import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default ({ page, pages, onChange }) => {
  return (
    <Pagination aria-label="Email navigation">
      <PaginationItem disabled={page === 0}>
        <PaginationLink
          previous
          href="#"
          onClick={() => onChange({ page: page - 1 })}
        />
      </PaginationItem>
      <PaginationItem disabled>
        <PaginationLink>{page + 1}</PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={page >= pages - 1}>
        <PaginationLink
          next
          href="#"
          onClick={() => onChange({ page: page + 1 })}
        />
      </PaginationItem>
    </Pagination>
  )
}
