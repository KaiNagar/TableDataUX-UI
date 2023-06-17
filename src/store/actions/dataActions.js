import { dataService } from "../../services/data.service.js";
import { store } from "../index.js";
import { ADD_ROW, REMOVE_ROW, UNDO_REMOVE_ROW, ADD_COLUMN, REMOVE_COLUMN, UNDO_REMOVE_COLUMN, LOAD_DATA, SET_FILTER, UPDATE_CELL, UNDO_UPDATE_CELL } from "../reducers/dataReducer";

export async function loadData() {
    try {
        const { filterBy } = store.getState().dataModule
        const data = await dataService.query(filterBy)
        store.dispatch({ type: LOAD_DATA, data })
        return data
    } catch (err) {
        throw err
    }
};

export async function addRow() {
    try {
        const newRow = await dataService.addRow()
        store.dispatch({ type: ADD_ROW, row: newRow })
    } catch (err) {
        throw err
    }
}

export async function removeRow(rowId) {
    try {
        store.dispatch({ type: REMOVE_ROW, rowId })
        await dataService.removeRow(rowId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_ROW })
        throw err
    }
}
export async function addColumn(column) {
    console.log(column);
    try {
        const newColumn = await dataService.addColumn(column)
        store.dispatch({ type: ADD_COLUMN, column: newColumn })
        return newColumn
    } catch (err) {
        throw err
    }
}

export async function removeColumn(columnId) {
    try {
        store.dispatch({ type: REMOVE_COLUMN, columnId })
        await dataService.removeColumn(columnId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_COLUMN })
        throw err
    }
}

export async function updateCell(rowIdx, columnId, value) {
    try {
        store.dispatch({ type: UPDATE_CELL, info: { rowIdx, columnId, value } })
        await dataService.updateCell(rowIdx, columnId, value)
    } catch (err) {
        store.dispatch({ type: UNDO_UPDATE_CELL, info: { rowIdx, columnId } })
        throw err
    }
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}
