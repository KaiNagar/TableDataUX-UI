import { useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { dataService } from '../services/data.service'
import { TableData } from '../cmps/TableData'

export const TableIndex = () => {
  const [data, setData] = useState(null)

  useEffectUpdate(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const dataToUse = await dataService.query()
    setData(dataToUse)
  }

  const onAddRow = () => {
    const newRow = dataService.getEmptyRow()
    const newData = { ...data, rows: [...data.rows, newRow] }
    setData(newData)
    dataService.save(newData)
  }

  const onAddColumn = () => {
    console.log('adding column')
  }

  const onSaveCell = (rowId, columnId, elInput) => {
    if (!elInput) return
    let newValue = ''
    switch (elInput.type) {
      case 'checkbox':
        newValue = elInput.checked
        break
      case 'textarea':
        newValue = JSON.parse(elInput.value)
        break
      default:
        newValue = elInput.value
        break
    }
    if (elInput?.name === 'array') newValue = newValue.split()
    const updatedData = { ...data }
    const rowIndex = updatedData.rows.findIndex((row) => row.id === rowId)
    const columnIndex = updatedData.columns.findIndex(
      (column) => column.id === columnId
    )
    if (rowIndex !== -1 && columnIndex !== -1) {
      updatedData.rows[rowIndex][columnId] = newValue
      setData(updatedData)
      dataService.save(updatedData)
    }
  }
  return (
    <section className='table-index flex align-items justify-center'>
      <DataFilter />
      {data ? (
        <TableData
          onAddRow={onAddRow}
          onAddColumn={onAddColumn}
          data={data}
          onSaveCell={onSaveCell}
        />
      ) : (
        <span>Loading Data...</span>
      )}
    </section>
  )
}
