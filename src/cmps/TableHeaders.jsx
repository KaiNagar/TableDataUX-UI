export const TableHeaders = ({ columns,onAddColumn }) => {
  return (
    <tr>
      {columns
        .sort((c1, c2) => c1.ordinalNo - c2.ordinalNo)
        .map((column) => (
          <th key={column.id} style={{ width: column.width }}>
            {column.title}
          </th>
        ))}
      {columns.length < 5 && (
        <th onClick={onAddColumn} title='Add a column' className='add-column-btn'>
          +
        </th>
      )}
    </tr>
  )
}
