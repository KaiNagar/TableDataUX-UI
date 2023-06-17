import { useEffect } from 'react'
import { useState } from 'react'

export const DataFilter = ({ onSetFilterBy, columns }) => {
  const [selectedColumns, setSelectedColumns] = useState([])

  const [rowFilter, setRowFilter] = useState({ text: '', minAge: '' })
  useEffect(() => {
    onSetFilterBy({
      columns: selectedColumns,
      text: rowFilter.text,
      minAge: rowFilter.minAge,
    })
  }, [rowFilter,selectedColumns])

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
      setSelectedColumns([])
    } else {
      // Not all columns are selected, select all columns
      const allColumnIds = columns.map((column) => column.id)
      setSelectedColumns(allColumnIds)
    }
  }

  const handleRowFilterChange = ({ target }) => {
    const { name: field, value, type } = target
    setRowFilter((prevState) => ({
      ...prevState,
      [field]: type === 'number' ? +value : value,
    }))
  }

  const handleFilter = () => {
    onSetFilterBy({
      columns: selectedColumns,
      text: rowFilter.text,
      minAge: rowFilter.minAge,
    })
  }
  return (
    <section className='data-filter flex column align-center'>
      <div className='filters-containers flex space-between'>
        <div className='column-filter-container'>
          <h1 className='columns-filter-header'>Filter by columns:</h1>
          <div className='check-boxes-container'>
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
                type='checkbox'
                checked={selectedColumns.length === columns.length}
                onChange={handleAllCheckboxChange}
              />
              Select All
            </label>
          </div>
        </div>
        <div className='rows-filter-container'>
          <h1 className='rows-filter-header'>Filter by rows:</h1>
          <div className='rows-inputs-container flex'>
            <div className=''>
              <label htmlFor='byName'>By name:</label>
              <input
                type='text'
                id='byName'
                value={rowFilter.text}
                name='text'
                onChange={handleRowFilterChange}
                placeholder='Search by name'
              />
            </div>
            <div className=''>
              <label htmlFor='byAge'>By age:</label>
              <input
                id='byAge'
                type='number'
                value={rowFilter.minAge}
                name='minAge'
                onChange={handleRowFilterChange}
                placeholder='Search by min age'
              />
            </div>
          </div>
        </div>
        <button className='filter-btn' onClick={handleFilter}>
          Filter
        </button>
      </div>
    </section>
  )
}
