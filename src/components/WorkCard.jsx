import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, Chip, IconButton, Collapse } from '@mui/material'
import MovementList from './MovementList'

function WorkCard({ work }) {
  const [expanded, setExpanded] = useState(false)

  const hasMovements = work.movements && work.movements.length > 0

  const handleToggle = () => {
    if (hasMovements) {
      setExpanded(!expanded)
    }
  }

  return (
      <Card 
        sx={{ 
          mb: 2, 
          userSelect: 'text',
          cursor: hasMovements ? 'pointer' : 'default',
          transition: 'box-shadow 0.2s ease',
          '&:hover': hasMovements ? {
            boxShadow: 3
          } : {}
        }}
        onClick={handleToggle}
      >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700, fontFamily: '"Playfair Display", "EB Garamond", Georgia, serif' }}>
              {work.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Chip 
                label={work.composer} 
                size="small" 
                color="primary"
              />
              {work.genre && <Chip label={work.genre} size="small" color="secondary" variant="outlined" />}
              {work.period && <Chip label={work.period} size="small" variant="outlined" />}
            </Box>
          </Box>
          {hasMovements && (
            <IconButton 
              size="small"
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
              sx={{ flexShrink: 0, ml: 1 }}
            >
              <Box 
                component="span" 
                className={`mdi ${expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'}`}
                sx={{ fontSize: '1.5rem' }}
              />
            </IconButton>
          )}
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <MovementList movements={work.movements} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default WorkCard