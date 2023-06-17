import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

export const TableRowList = ({
  rows,
  columns,
  onSaveCell,
  onAddRow,
  onRemoveRow,
}) => {
  const [editedCell, setEditedCell] = useState(null)
  const editedCellValueRef = useRef('')

  const tdRef = useRef()
  const [cellDimensions, setCellDimensions] = useState({ width: 0, height: 0 })

  const [hoveredRow, setHoveredRow] = useState(null)

  const handleMouseEnter = (index) => {
    setHoveredRow(index)
  }

  const handleMouseLeave = () => {
    setHoveredRow(null)
  }

  const handleEditCell = (rowId, columnId, value) => {
    const cell = tdRef.current
    if (cell) {
      const { width, height } = cell.getBoundingClientRect()
      setCellDimensions({ width, height })
    }
    setEditedCell({ rowId, columnId })
    editedCellValueRef.current = value?.toString()
  }

  const handleSaveCell = () => {
    if (editedCell) {
      onSaveCell(
        editedCell.rowId,
        editedCell.columnId,
        editedCellValueRef.current
      )
      setEditedCell(null)
    }
  }

  const handleCancelEdit = () => {
    setEditedCell(null)
    editedCellValueRef.current = ''
  }

  const onUserAction = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSaveCell()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const renderCellEditElement = (column, cellValue) => {
    const defaultArgs = {
      onBlur: handleSaveCell,
      onKeyDown: onUserAction,
      ref: editedCellValueRef,
    }
    if (column.type === 'object') {
      return (
        <textarea
          style={{
            width: cellDimensions.width - 16,
            height: cellDimensions.height - 16,
          }}
          className='textarea-cell-input'
          defaultValue={JSON.stringify(cellValue, null, 2)}
          {...defaultArgs}
        ></textarea>
      )
    } else {
      return (
        <input
          name={column.type === 'array' ? 'array' : ''}
          type={getInputType(column.type)}
          className='edit-cell-input'
          defaultValue={cellValue}
          {...defaultArgs}
        />
      )
    }
  }

  const renderCellValue = (cellValue, columnType, rowId, columnId) => {
    if (columnType === 'boolean') {
      return (
        <>
          <label className='toggle-switch'>
            <input
              type='checkbox'
              checked={cellValue || false}
              onChange={(e) => onSaveCell(rowId, columnId, e.target)}
            />
            <span className='slider'></span>
          </label>
        </>
      )
    } else if (columnType === 'object') {
      return (
        <pre onClick={() => handleEditCell(rowId, columnId, cellValue)}>
          {JSON.stringify(cellValue, null, 2)}
        </pre>
      )
    } else if (columnType === 'array') {
      if (cellValue) return cellValue?.join()
    }
    return cellValue
  }

  const getInputType = (type) => {
    switch (type) {
      case 'boolean':
        return 'checkbox'
      case 'number':
        return 'number'
      default:
        return 'text'
    }
  }

  const checkIsEditing = (row, column) => {
    return (
      editedCell &&
      editedCell.rowId === row.id &&
      editedCell.columnId === column.id
    )
  }

  return (
    <>
      {rows.map((row, idx) => (
        <tr
          className='table-row-tr'
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
          key={row.id}
        >
          {columns.map((column) => {
            const cellValue = row[column.id]
            const isEditing = checkIsEditing(row, column)
            return (
              <td
                ref={tdRef}
                key={`${row.id}-${column.id}`}
                style={column.type === 'boolean' ? { textAlign: 'center' } : {}}
                onClick={() =>
                  !isEditing && handleEditCell(row.id, column.id, cellValue)
                }
              >
                {isEditing && column.type !== 'boolean' ? (
                  renderCellEditElement(column, cellValue)
                ) : (
                  <span>
                    {renderCellValue(cellValue, column.type, row.id, column.id)}
                  </span>
                )}
              </td>
            )
          })}
          {hoveredRow === idx && (
            <FontAwesomeIcon
              className='delete-row-btn'
              icon={faTrashCan}
              onClick={() => onRemoveRow(row.id)}
            />
          )}
        </tr>
      ))}
      {
        <tr>
          <td onClick={onAddRow} className='add-row-btn'>
            +
          </td>
        </tr>
      }
    </>
  )
}
