import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const TableHeaders = ({
  columns,
  onOpenColumnModal,
  onRemoveColumn,
}) => {
  const [hoveredHeader, setHoveredHeader] = useState(null)

  const handleMouseEnter = (index) => {
    setHoveredHeader(index)
  }

  const handleMouseLeave = () => {
    setHoveredHeader(null)
  }
  return (
    <tr className='table-row-tr'>
      {columns
        .sort((c1, c2) => c1.ordinalNo - c2.ordinalNo)
        .map((column, idx) => (
          <th
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            key={column.id}
            style={{ width: column.width }}
          >
            {column.title.charAt(0).toUpperCase() + column.title.slice(1)}
            {hoveredHeader === idx && (
              <FontAwesomeIcon
                className='delete-column-btn'
                icon={faTrashCan}
                onClick={() => onRemoveColumn(column.id)}
              />
            )}
          </th>
        ))}
      {columns.length < 6 && (
        <th
          onClick={onOpenColumnModal}
          title='Add a column'
          className='add-column-btn'
        >
          +
        </th>
      )}
    </tr>
  )
}
