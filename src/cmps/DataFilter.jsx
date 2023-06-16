import { useState } from 'react'

export const DataFilter = ({onSetFilterBy, columns }) => {
  const [selectedColumns, setSelectedColumns] = useState([])

  const handleCheckboxChange = (columnId) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.includes(columnId)) {
        // Column is already selected, remove it from the selected columns
        return prevSelectedColumns.filter((col) => col !== columnId)
      } else {
        // Column is not selected, add it to the selected columns
        return [...prevSelectedColumns, columnId]
      }
    })
  }
  const handleAllCheckboxChange = () => {
    if (selectedColumns.length === columns.length) {
      // All columns are selected, deselect all columns
      setSelectedColumns([]);
    } else {
      // Not all columns are selected, select all columns
      const allColumnIds = columns.map((column) => column.id);
      setSelectedColumns(allColumnIds);
    }
  }

  const handleFilter = () => {
    onSetFilterBy(selectedColumns)
  }
  return (
    <section className='data-filter'>
      {columns.map((column) => (
        <label key={column.id}>
          <input
            type='checkbox'
            checked={selectedColumns.includes(column.id)}
            onChange={() => handleCheckboxChange(column.id)}
          />
          {column.title}
        </label>
      ))}
       <label>
        <input
          type="checkbox"
          checked={selectedColumns.length === columns.length}
          onChange={handleAllCheckboxChange}
        />
        Select All
      </label>
      <button onClick={handleFilter}>Filter</button>
    </section>
  )
}
