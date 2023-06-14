export const TableData = ({ data,columnsToDisplay }) => {
  return (
    <table>
      <thead>
        <tr>
          {data.columns.map((column) => (
            <th key={column.id} style={{ width: column.width }}>
              {column.title}
            </th>
          ))}
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
      </tbody>
    </table>
  )
}
