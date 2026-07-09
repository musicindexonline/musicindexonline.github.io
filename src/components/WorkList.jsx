import React, { useMemo, useEffect, useRef } from 'react'
import { Box, Typography, Pagination } from '@mui/material'
import WorkCard from './WorkCard'
import { filterWorks } from '../utils/search'

const DEFAULT_ITEMS_PER_PAGE = 20

function WorkList({ data, searchTerm, filters, page, onPageChange, itemsPerPage, onCopyText, clickCopyEnabled }) {
  const localPage = page || 1
  const perPage = itemsPerPage || DEFAULT_ITEMS_PER_PAGE
  const prevPageRef = useRef(localPage)

  useEffect(() => {
    if (prevPageRef.current !== localPage) {
      prevPageRef.current = localPage
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [localPage])

  const filteredData = useMemo(() => {
    const result = filterWorks(data, searchTerm, filters)
    return result
  }, [data, searchTerm, filters])

  const totalPages = Math.ceil(filteredData.length / perPage)
  const startIndex = (localPage - 1) * perPage
  const endIndex = startIndex + perPage
  const currentPageData = filteredData.slice(startIndex, endIndex)

  if (filteredData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6, py: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No work matched
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {currentPageData.map((work, index) => (
        <WorkCard
          key={`${work.composer}-${work.title}-${index}`}
          work={work}
          onCopyText={onCopyText}
          clickCopyEnabled={clickCopyEnabled}
        />
      ))}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination 
            count={totalPages}
            page={localPage}
            onChange={(e, value) => (onPageChange || (() => {}))(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  )
}

export default WorkList