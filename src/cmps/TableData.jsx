import React from 'react'
import { TableHeaders } from './TableHeaders'
import { TableRowList } from './TableRowList'

export const TableData = ({ data, onSaveCell,onAddRow,onAddColumn }) => {
  
  return (
    <div className='table-data'>
      <table>
        <thead>
          <TableHeaders onAddColumn={onAddColumn} columns={data.columns} />
        </thead>
        <tbody>
          <TableRowList
            rows={data.rows}
            columns={data.columns}
            onSaveCell={onSaveCell}
            onAddRow={onAddRow}
          />
        </tbody>
      </table>
    </div>
  )
}
