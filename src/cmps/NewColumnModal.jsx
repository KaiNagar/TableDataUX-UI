import { useState } from 'react'
import { dataService } from '../services/data.service'

export const NewColumnModal = ({
  onCloseNewColumnModal,
  onAddColumn,
}) => {
  const [newColumn, setNewColumn] = useState(dataService.getEmptycolumn())
  const [inputClicked, setInputClicked] = useState(false)

  const handleNewColumnChange = ({ target }) => {
    const { name: field, value } = target
    setNewColumn((prevColumn) => ({ ...prevColumn, [field]: value }))
  }

  const onSubmitColumn = () => {
    if (newColumn.width > 300 || newColumn.width < 100 || !newColumn.title) {
      setInputClicked(true)
      return
    }
    onAddColumn(newColumn)
  }

  return (
    <section
      className='new-column-modal flex column'
    >
      <span
        className='close-modal-btn flex align-items justify-center'
        onClick={onCloseNewColumnModal}
      >
        ✖
      </span>
      <h1 className='new-column-add-header'>Add A New Column</h1>
      <div>
        <label className='input-label' htmlFor='type'>
          Select column's type:
        </label>
        <select
          value={newColumn.type}
          onChange={handleNewColumnChange}
          name='type'
          id='type'
          className='type-select'
        >
          <option value='string'>String</option>
          <option value='object'>Object</option>
          <option value='array'>Array</option>
          <option value='numeber'>Number</option>
          <option value='boolean'>Boolean</option>
        </select>
      </div>
      <div className='flex space-between'>
        <div>
          <label className='input-label' htmlFor='title'>
            Enter column's title:
          </label>
          <input
            type='text'
            name='title'
            id='title'
            onChange={handleNewColumnChange}
            value={newColumn.title}
            className='title-input'
            placeholder='Enter title here'
            onClick={() => setInputClicked(true)}
          />
          {!newColumn.title && inputClicked && (
            <span className='error-span'>Must enter a title!</span>
          )}
        </div>
        <div className='width-input-container'>
          <label className='input-label' htmlFor='width'>
            Enter column's width:
          </label>
          <input
            type='number'
            name='width'
            id='width'
            className='width-input'
            onChange={handleNewColumnChange}
            value={newColumn.width}
            min={100}
            max={300}
          />
          {(newColumn.width > 300 || newColumn.width < 100) && (
            <span className='error-span'>
              Width must be between 100 and 300!
            </span>
          )}
        </div>
      </div>
      <button onClick={onSubmitColumn} className='add-column-btn'>
        Add
      </button>
    </section>
  )
}
