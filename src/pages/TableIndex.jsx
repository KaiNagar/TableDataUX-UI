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

  const onCellEdit = (rowId, columnId, elInput) => {
    if (!elInput) return
    const newValue =
      elInput.type === 'checkbox' ? elInput.checked : elInput.value
    const updatedData = { ...data }
    const rowIndex = updatedData.rows.findIndex((row) => row.id === rowId)
    const columnIndex = updatedData.columns.findIndex(
      (column) => column.id === columnId
    )

    if (rowIndex !== -1 && columnIndex !== -1) {
      updatedData.rows[rowIndex][columnId] = newValue
      setData(updatedData)
    }
  }
  return (
    <section className='table-index flex align-items justify-center'>
      {data ? (
        <TableData data={data} onCellEdit={onCellEdit} />
      ) : (
        <span>Loading Data...</span>
      )}
    </section>
  )
}
