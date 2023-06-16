import { storageService } from "./async-storage.service"

export const dataService = {
    query,
    updateCell
}

const STORAGE_KEY = 'dataDB'

_createData()


function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
}

function updateCell(cell) {
    return storageService.put(cell)
}

function getEmptyRow(){
    return  {
        id:_makeId()
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
                // adding column
                // {
                //     id: 'c103',
                //     ordinalNo: 3,
                //     title: 'Rank',
                //     type: 'string',
                //     width: 200
                // }
            ],
            rows: [
                {
                    id: 'r200',
                    c100: 'Kai Nagar',
                    c101: 25,
                    c102: true,
                },
                {
                    id: 'r201',
                    c100: 'Tanjiro Kamado',
                    c101: 13,
                    c102: true,
                },
                {
                    id: 'r202',
                    c100: 'Inosuke Hashibira',
                    c101: 15,
                    c102: false,
                },
                {
                    id: 'r203',
                    c100: 'Zenitsu Agatsuma',
                    c101: 16,
                    c102: false,
                },
                //adding new row just need id
                // {
                //     id: 'r204',
                // },
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