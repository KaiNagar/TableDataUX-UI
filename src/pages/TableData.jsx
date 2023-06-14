export const TableData = ({ data, columnsToDisplay }) => {
  return (
    <div className='table-data'>
      <table>
        <thead>
          <tr>
            {data.columns.map((column) => (
              <th key={column.id} style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
            {data.columns.length <= 5 ? (
              <th title='Add a column' className='add-column-btn'>
                +
              </th>
            ) : (
              <span>Can only render 5 columns at a time</span>
            )}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.id}>
              {data.columns.map((column) => (
                <td key={`${row.id}-${column.id}`}>
                  {column.type === 'boolean'
                    ? row[column.id]
                      ? 'Yes'
                      : 'No'
                    : row[column.id]}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            {data.rows.length <= 5 ? (
              <td title='Add a row' className='add-row-btn'>
                +
              </td>
            ) : (
              <span>Can only render 5 rows at a time</span>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
