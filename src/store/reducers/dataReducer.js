import { dataService } from "../../services/data.service";

const INITIAL_STATE = {
    data: {},
    filterBy: dataService.getEmptyFilterBy()
}

export const LOAD_DATA = 'LOAD_DATA'
export const ADD_ROW = 'ADD_ROW'
export const REMOVE_ROW = 'REMOVE_ROW'
export const ADD_COLUMN = 'ADD_COLUMN'
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const UPDATE_CELL = 'UPDATE_CELL'
export const SET_FILTER = 'SET_FILTER'


export const UNDO_REMOVE_ROW = 'UNDO_REMOVE_ROW'
export const UNDO_REMOVE_COLUMN = 'UNDO_REMOVE_COLUMN'
export const UNDO_UPDATE_CELL = 'UNDO_UPDATE_CELL'

export function dataReducer(state = INITIAL_STATE, action) {
    let data
    let lastRemovedRow
    let lastRemovedColumn
    let newColumns
    let newRows
    let lastUpdatedCellValue
    switch (action.type) {
        case LOAD_DATA:
            return { ...state, data: action.data }
        case ADD_COLUMN:
            data = { ...state.data, columns: [...state.data.columns, action.column] }
            return { ...state, data }
        case ADD_ROW:
            data = { ...state.data, rows: [...state.data.rows, action.row] }
            return { ...state, data }
        case REMOVE_COLUMN:
            lastRemovedColumn = state.data.columns.find(c => c.id === action.columnId)
            newColumns = state.data.columns.filter(c => c.id !== action.columnId)
            return { ...state, data: { ...state.data, columns: newColumns } }
        case REMOVE_ROW:
            lastRemovedRow = state.data.rows.find(r => r.id === action.rowId)
            newRows = state.data.rows.filter(r => r.id !== action.rowId)
            return { ...state, data: { ...state.data, rows: newRows } }
        case UPDATE_CELL:
            lastUpdatedCellValue = state.data.rows[action.info.rowIdx][action.info.columnId]
            data = { ...state.data, rows: state.data.rows.map((r, i) => i === action.info.rowIdx ? { ...r, [action.info.columnId]: action.info.value } : r) }
            return { ...state, data }
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case UNDO_REMOVE_COLUMN:
            ({ lastRemovedColumn } = state)
            data = { ...state.data, columns: [...state.data.columns, lastRemovedColumn] }
            return { ...state, data }
        case UNDO_REMOVE_ROW:
            ({ lastRemovedRow } = state)
            data = { ...state.data, rows: [...state.data.rows, lastRemovedRow] }
            return { ...state, data }
        case UNDO_UPDATE_CELL:
            ({ lastUpdatedCellValue } = state)
            data = {
                ...state.data, rows: state.data.rows.map((r, i) => i === action.info.rowIdx ? { ...r, [action.info.columnId]: lastUpdatedCellValue } : r)
            }
            return { ...state, data }
        default:
            return state;
    }
}