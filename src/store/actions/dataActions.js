import { dataService } from "../../services/data.service.js";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js";
import { store } from "../index.js";
import { ADD_ROW, REMOVE_ROW, UNDO_REMOVE_ROW, ADD_COLUMN, REMOVE_COLUMN, UNDO_REMOVE_COLUMN, LOAD_DATA, SET_FILTER, UPDATE_CELL, UNDO_UPDATE_CELL } from "../reducers/dataReducer";

export async function loadData() {
    try {
        const { filterBy } = store.getState().dataModule
        const data = await dataService.query(filterBy)
        store.dispatch({ type: LOAD_DATA, data })
        return data
    } catch (err) {
        showErrorMsg('Something went wrong')
        throw err
    }
};

export async function addRow() {
    try {
        const newRow = await dataService.addRow()
        store.dispatch({ type: ADD_ROW, row: newRow })
        showSuccessMsg('Added row successfully')
    } catch (err) {
        showErrorMsg('Something went wrong')
        throw err
    }
}

export async function removeRow(rowId) {
    try {
        store.dispatch({ type: REMOVE_ROW, rowId })
        await dataService.removeRow(rowId)
        showSuccessMsg('Removed row successfully')
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_ROW })
        showErrorMsg('Something went wrong')
        throw err
    }
}
export async function addColumn(column) {
    try {
        const newColumn = await dataService.addColumn(column)
        store.dispatch({ type: ADD_COLUMN, column: newColumn })
        showSuccessMsg('Added column successfully')
        return newColumn
    } catch (err) {
        showErrorMsg('Something went wrong')
        throw err
    }
}

export async function removeColumn(columnId) {
    try {
        store.dispatch({ type: REMOVE_COLUMN, columnId })
        await dataService.removeColumn(columnId)
        showSuccessMsg('Removed column successfully')
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_COLUMN })
        showErrorMsg('Something went wrong')
        throw err
    }
}

export async function updateCell(rowIdx, columnId, value) {
    try {
        store.dispatch({ type: UPDATE_CELL, info: { rowIdx, columnId, value } })
        await dataService.updateCell(rowIdx, columnId, value)
        showSuccessMsg('Cell updated successfully')
    } catch (err) {
        store.dispatch({ type: UNDO_UPDATE_CELL, info: { rowIdx, columnId } })
        showErrorMsg('Something went wrong')
        throw err
    }
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}
