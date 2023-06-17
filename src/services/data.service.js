import { storageService } from "./async-storage.service"

export const dataService = {
    query,
    getEmptyRow,
    getEmptycolumn,
    getEmptyFilterBy,
    addRow,
    removeRow,
    addColumn,
    removeColumn,
    updateCell
}

const STORAGE_KEY = 'dataDB'

_createData()


async function query(filterBy = {}) {
    let data = await storageService.query(STORAGE_KEY)
    // filtering columns
    if (filterBy.columns.length) {
        data.columns = data.columns.filter(c => filterBy.columns.includes(c.id))
    }
    // filtering rows
    if (filterBy.text) {
        const regex = new RegExp(filterBy.text, 'i')
        const stringColumnsIds = data.columns.map(c => c.type === 'string' ? c.id : '')
        data.rows = data.rows.filter((row) => {
            for (const columnId of stringColumnsIds) {
                const cellValue = row[columnId]
                if (regex.test(cellValue)) return true;
            }
            return false;
        })
    }
    if (filterBy.minAge) {
        const numberColumnsIds = data.columns.map(c => c.type === 'number' ? c.id : '')
        data.rows = data.rows.filter(row => {
            for (const columnId of numberColumnsIds) {
                const cellValue = row[columnId]
                if (cellValue > filterBy.minAge) return true;
            }
            return false;
        })
    }
    return data
}

async function removeRow(rowId) {
    try {
        let data = await storageService.query(STORAGE_KEY)
        data.rows = data.rows.filter(r => r.id !== rowId)
        _save(data)
        return data
    } catch (err) {
        throw new Error('Could not remove row')
    }
}

async function addRow() {
    try {
        let data = await storageService.query(STORAGE_KEY)
        const newRow = getEmptyRow()
        const newData = { ...data, rows: [...data.rows, newRow] }
        _save(newData)
        return newRow
    } catch (err) {
        throw new Error('Could not add row')
    }

}

async function addColumn(newColumn) {
    try {
        let data = await storageService.query(STORAGE_KEY)
        const newData = { ...data, columns: [...data.columns, newColumn] }
        _save(newData)
        return newColumn
    } catch (err) {
        throw new Error('Could not add column')
    }
}

async function removeColumn(columnId) {
    try {
        let data = await storageService.query(STORAGE_KEY)
        const newColumns = data.columns.filter((c) => c.id !== columnId)
        const newData = { ...data, columns: newColumns }
        _save(newData)
        return newData
    } catch (err) {
        throw new Error('Could not remove column')
    }

}

async function updateCell(rowIdx, columnId, value) {
    try {
        let data = await storageService.query(STORAGE_KEY)
        data.rows[rowIdx][columnId] = value
        _save(data)
        return data
    } catch (err) {
        throw new Error('Could not update cell')
    }
}


function _save(newData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
}

function getEmptyRow() {
    return {
        id: _makeId()
    }
}

function getEmptycolumn() {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return {
        id: _makeId(),
        ordinalNo: data.columns.length,
        title: '',
        type: '',
        width: 100
    }
}

function getEmptyFilterBy() {
    return {
        columns: [],
        text: '',
        minAge: 0,
    }
}




function _createData() {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!data) {
        data = {
            columns: [
                {
                    id: 'c100',
                    ordinalNo: 0,
                    title: 'Name',
                    type: 'string',
                    width: 250
                },
                {
                    id: 'c101',
                    ordinalNo: 1,
                    title: 'Age',
                    type: 'number',
                    width: 150
                },
                {
                    id: 'c102',
                    ordinalNo: 2,
                    title: 'Is Admin',
                    type: 'boolean',
                    width: 100
                },
                {
                    id: 'c103',
                    ordinalNo: 3,
                    title: 'Best Episodes',
                    type: 'array',
                    width: 150
                },
                {
                    id: 'c104',
                    ordinalNo: 4,
                    title: 'Profile',
                    type: 'object',
                    width: 150
                },
                {
                    id: 'c105',
                    ordinalNo: 3,
                    title: 'Rank',
                    type: 'string',
                    width: 200
                }
            ],
            rows: [
                {
                    id: 'r200',
                    c100: 'Kai Nagar',
                    c101: 25,
                    c102: true,
                    c103: [5, 12, 14, 'S3 E5'],
                    c105:'hashira'

                },
                {
                    id: 'r201',
                    c100: 'Tanjiro Kamado',
                    c101: 13,
                    c102: true,
                    c104: {  breathingType: 'sun' },
                    c105:'hashira'
                },
                {
                    id: 'r202',
                    c100: 'Inosuke Hashibira',
                    c101: 15,
                    c102: false,
                    c103:['S2E10'],
                    c104: {  breathingType: 'beast' }
                },
                {
                    id: 'r203',
                    c100: 'Zenitsu Agatsuma',
                    c101: 16,
                    c103:['S3E6'],
                    c102: false,
                    c104: { crush: 'nezuko', breathingType: 'thunder' }
                },
            ]
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
}


function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}