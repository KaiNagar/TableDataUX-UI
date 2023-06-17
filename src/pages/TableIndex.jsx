import { useRef, useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { TableData } from '../cmps/TableData'
import { DataFilter } from '../cmps/DataFilter'
import { NewColumnModal } from '../cmps/NewColumnModal'
import { useSelector } from 'react-redux'
import {
  addColumn,
  addRow,
  loadData,
  removeColumn,
  removeRow,
  setFilter,
  updateCell,
} from '../store/actions/dataActions'

export const TableIndex = () => {
  const { data } = useSelector((state) => state.dataModule)
  const [isNewColumnModalShow, setIsNewColumnModalShow] = useState(false)

  const { filterBy } = useSelector((state) => state.dataModule)
  const [allColumns, setAllColumns] = useState()
  const isFirstRender = useRef(true)

  useEffectUpdate(() => {
    onLoadingData()
  }, [filterBy])

  const onLoadingData = async () => {
    const updatedData = await loadData(filterBy)
    if (isFirstRender.current) {
      isFirstRender.current = false
      setAllColumns(updatedData.columns)
    }
  }

  const onOpenColumnModal = () => {
    setIsNewColumnModalShow(true)
  }
  const onCloseNewColumnModal = () => {
    setIsNewColumnModalShow(false)
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
    const rowIndex = data.rows.findIndex((row) => row.id === rowId)
    const columnIndex = data.columns.findIndex(
      (column) => column.id === columnId
    )
    if (rowIndex !== -1 && columnIndex !== -1) {
      updateCell(rowIndex, columnId, newValue)
    }
  }
  const checkIfDataReady = ()=>{
    if(!data)return false
    if(!data.rows||!data.columns)return false
    return true
  }
  return (
    <section className='table-index flex column align-items justify-center'>
      {checkIfDataReady()? (
        <>
          {allColumns && (
            <DataFilter onSetFilterBy={setFilter} columns={allColumns} />
          )}
          <TableData
            onAddRow={addRow}
            onOpenColumnModal={onOpenColumnModal}
            data={data}
            onSaveCell={onSaveCell}
            onRemoveColumn={removeColumn}
            onRemoveRow={removeRow}
          />
        </>
      ) : (
        <span>Loading Data...</span>
      )}
      {isNewColumnModalShow && (
        <NewColumnModal
          onCloseNewColumnModal={onCloseNewColumnModal}
          onAddColumn={addColumn}
        />
      )}
    </section>
  )
}
