import React, { useRef, useState } from "react";

export const TableData = ({ data, onCellEdit }) => {
  const [editedCell, setEditedCell] = useState(null);
  const editedCellValueRef = useRef("");

  const handleEditCell = (rowId, columnId, value) => {
    setEditedCell({ rowId, columnId });
    editedCellValueRef.current = value.toString();
  };

  const handleSaveCell = () => {
    if (editedCell) {
      onCellEdit(
        editedCell.rowId,
        editedCell.columnId,
        editedCellValueRef.current
      );
      setEditedCell(null);
    }
  };

  const handleCancelEdit = () => {
    setEditedCell(null);
    editedCellValueRef.current = "";
  };

  const renderCellValue = (cellValue, columnType, rowId, columnId) => {
    if (columnType === "boolean") {
      return (
        <input
          type="checkbox"
          checked={cellValue}
          onChange={(e) =>
            onCellEdit(rowId, columnId, e.target.checked)
          }
        />
      );
    } else if (typeof cellValue === "number") {
      return cellValue.toString();
    }
    return cellValue;
  };

  const onUserAction = (e) => {
    if (e.key === "Enter") {
      handleSaveCell();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="table-data">
      <table>
        <thead>
          <tr>
            {data.columns
              .sort((c1, c2) => c1.ordinalNo - c2.ordinalNo)
              .map((column) => (
                <th key={column.id} style={{ width: column.width }}>
                  {column.title}
                </th>
              ))}
            {data.columns.length < 5 && (
              <th title="Add a column" className="add-column-btn">
                +
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.id}>
              {data.columns.map((column) => {
                const cellValue = row[column.id];
                const isEditing =
                  editedCell &&
                  editedCell.rowId === row.id &&
                  editedCell.columnId === column.id;
                return (
                  <td
                    key={`${row.id}-${column.id}`}
                    onClick={() =>
                      !isEditing && handleEditCell(row.id, column.id, cellValue)
                    }
                  >
                    {isEditing ? (
                      <input
                        type={column.type === "boolean" ? "checkbox" : "text"}
                        defaultValue={cellValue}
                        onBlur={handleSaveCell}
                        onKeyDown={onUserAction}
                        ref={editedCellValueRef}
                      />
                    ) : (
                      <span>
                        {renderCellValue(
                          cellValue,
                          column.type,
                          row.id,
                          column.id
                        )}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
          {data.rows.length < 5 && (
            <tr>
                <td className='add-row-btn'>+</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
