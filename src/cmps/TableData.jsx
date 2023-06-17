import React from 'react'
import { TableHeaders } from './TableHeaders'
import { TableRowList } from './TableRowList'

export const TableData = ({ data, onSaveCell,onAddRow,onOpenColumnModal,onRemoveColumn,onRemoveRow }) => {
  
  return (
    <div className='table-data'>
      <table>
        <thead>
          <TableHeaders onRemoveColumn={onRemoveColumn} onOpenColumnModal={onOpenColumnModal} columns={data.columns} />
        </thead>
        <tbody>
          <TableRowList
            rows={data.rows}
            columns={data.columns}
            onSaveCell={onSaveCell}
            onAddRow={onAddRow}
            onRemoveRow={onRemoveRow}
          />
        </tbody>
      </table>
    </div>
  )
}
