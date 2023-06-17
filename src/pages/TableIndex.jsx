import { useEffect, useRef, useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { dataService } from '../services/data.service'
import { TableData } from '../cmps/TableData'
import { DataFilter } from '../cmps/DataFilter'
import { NewColumnModal } from '../cmps/NewColumnModal'

export const TableIndex = () => {
  const [data, setData] = useState(null)
  const [isNewColumnModalShow, setIsNewColumnModalShow] = useState(false)

  const [filterBy, setFilterBy] = useState(dataService.getEmptyFilterBy())
  const [allColumns, setAllColumns] = useState()
  const isFirstRender = useRef(true)

  useEffect(() => {
    loadData(filterBy)
  }, [filterBy])

  const loadData = async (filterBy) => {
    const dataToUse = await dataService.query(filterBy)
    if (isFirstRender.current) {
      isFirstRender.current = false
      setAllColumns(dataToUse.columns)
    }
    setData(dataToUse)
  }

  const onAddRow = async () => {
    try {
      const newData = await dataService.addRow()
      setData(newData)
    } catch (err) {
      console.error(err)
      // eventbus
    }
  }

  const onRemoveRow = async (rowId) => {
    try {
      const newData = await dataService.removeRow(rowId)
      setData(newData)
    } catch (err) {
      console.error(err)
      // eventbus
    }
  }

  const onOpenColumnModal = () => {
    setIsNewColumnModalShow(true)
  }
  const onCloseNewColumnModal = () => {
    setIsNewColumnModalShow(false)
  }

  const onAddColumn = async (newColumn) => {
    try {
      const newData = await dataService.addColumn(newColumn)
      setData(newData)
      onCloseNewColumnModal()
    } catch (err) {
      console.error(err)
      // eventbus
    }
  }

  const onRemoveColumn = async (columnId) => {
    try {
      const newData = await dataService.removeColumn(columnId)
      setData(newData)
    } catch (err) {
      console.error(err)
      // eventbus
    }
  }

  const onSetFilterBy = (newFilter) => {
    setFilterBy(newFilter)
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
    <section className='table-index flex column align-items justify-center'>
      {data ? (
        <>
          <DataFilter onSetFilterBy={onSetFilterBy} columns={allColumns} />
          <TableData
            onAddRow={onAddRow}
            onOpenColumnModal={onOpenColumnModal}
            data={data}
            onSaveCell={onSaveCell}
            onRemoveColumn={onRemoveColumn}
            onRemoveRow={onRemoveRow}
          />
        </>
      ) : (
        <span>Loading Data...</span>
      )}
      {isNewColumnModalShow && (
        <NewColumnModal
          onCloseNewColumnModal={onCloseNewColumnModal}
          onAddColumn={onAddColumn}
        />
      )}
    </section>
  )
}
