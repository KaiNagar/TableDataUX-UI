import { useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { dataService } from '../services/data.service'
import { TableData } from './TableData'

export const TableIndex = () => {
  const [data, setData] = useState()

  useEffectUpdate(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const dataToUse = await dataService.query()
    setData(dataToUse)
  }
  return (
    <section className='table-index flex align-items justify-center'>
      {data ? <TableData data={data} /> : <span>Loading Data...</span>}
    </section>
  )
}
