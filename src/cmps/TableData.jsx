import React, { useRef, useState } from 'react'

export const TableData = ({ data, onSaveCell }) => {
  const [editedCell, setEditedCell] = useState(null)
  const editedCellValueRef = useRef('')

  const tdRef = useRef()
  const [cellDimensions, setCellDimensions] = useState({ width: 0, height: 0 })

  const handleEditCell = (rowId, columnId, value) => {
    console.log(value)
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

  const renderCellValue = (cellValue, columnType, rowId, columnId) => {
    if (columnType === 'boolean') {
      return (
        <input
          type='checkbox'
          checked={cellValue}
          onChange={(e) => onSaveCell(rowId, columnId, e.target.checked)}
        />
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
    // maybe not needed
    return cellValue
  }

  const onUserAction = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSaveCell()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
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

  const renderCellEditElement = (column, cellValue) => {
    const defaultArgs = {
      onBlur: handleSaveCell,
      onKeyDown: onUserAction,
      ref: editedCellValueRef,
      className:
        column.type === 'object' ? 'textarea-cell-input' : 'edit-cell-input',
    }
    if (column.type === 'object') {
      return (
        <textarea
          style={{
            width: cellDimensions.width - 16,
            height: cellDimensions.height - 16,
          }}
          defaultValue={JSON.stringify(cellValue, null, 2)}
          {...defaultArgs}
        ></textarea>
      )
    } else if (column.type === 'boolean') {
      return (
        <input
          style={{ outline: 'none', margin: 0 }}
          type='checkbox'
          checked={cellValue}
          {...defaultArgs}
        />
      )
    } else {
      return (
        <input
          name={column.type === 'array' ? 'array' : ''}
          type={getInputType(column.type)}
          defaultValue={cellValue}
          {...defaultArgs}
        />
      )
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
    <div className='table-data'>
      <table>
        <thead>
          {/* send to diffrent cmp called <TableHeaders headers={data.columns} /> */}
          <tr>
            {data.columns
              .sort((c1, c2) => c1.ordinalNo - c2.ordinalNo)
              .map((column) => (
                <th key={column.id} style={{ width: column.width }}>
                  {column.title}
                </th>
              ))}
            {data.columns.length < 5 && (
              <th title='Add a column' className='add-column-btn'>
                +
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {/* diffrent cmp called <TableRowList rows={data.rows} onSaveCell={onSaveCell} /> */}
          {data.rows.map((row) => (
            <tr key={row.id}>
              {data.columns.map((column) => {
                const cellValue = row[column.id]
                const isEditing = checkIsEditing(row, column)

                return (
                  <td
                    ref={tdRef}
                    key={`${row.id}-${column.id}`}
                    onClick={() =>
                      !isEditing && handleEditCell(row.id, column.id, cellValue)
                    }
                    style={
                      column.type === 'boolean' ? { textAlign: 'center' } : {}
                    }
                  >
                    {/* must make it more readable there are 2 short if nested */}
                    {isEditing ? (
                      renderCellEditElement(column, cellValue)
                    ) : (
                      <span>
                        {renderCellValue(
                          cellValue,
                          column.type,
                          row.id,
                          column.id
                        )}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
          {
            <tr>
              <td className='add-row-btn'>+</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}
