import React from 'react'
import styled from '@emotion/styled'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const PortionLabel = styled.div`
  color: ${props => (props.colour ? props.colour : '#1daf88')};
  background-color: ${props => (props.colour ? props.colour : '#1daf88')}14;
  border-radius: 100px;
  padding: ${props => (props.size != 'small' ? `6px 16px` : `4px 12px`)};
  font-size: ${props => (props.size != 'small' ? `1rem` : `0.875rem`)};
  font-weight: 500;
  display: flex;
  align-items: center;

  .arrow-icon {
    margin-left: 4px;
  }
`

export const PercentLabel = ({ className, value, size }) => {
  const percent = isNaN(value) ? 0 : value
  return (
    <PortionLabel
      className={className}
      size={size || 'normal'}
      colour={percent < 0 ? '#ff6a6a' : '#1daf88'}
    >
      {percent.toFixed(2)}%
      {percent < 0 ? (
        <ArrowDownwardIcon className="arrow-icon" />
      ) : (
        <ArrowUpwardIcon className="arrow-icon" />
      )}
    </PortionLabel>
  )
}
