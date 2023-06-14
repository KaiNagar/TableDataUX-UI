import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/styles/style.scss'

import { Home } from './pages/Home'
import { Login } from './pages/Login'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { useState } from 'react'
import { dataService } from './services/data.service'
import { TableData } from './pages/TableData'
import { useEffectUpdate } from './customHooks/useEffectUpdate'

export function App() {
  const [data, setData] = useState()

  useEffectUpdate(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const dataToUse = await dataService.query()
    setData(dataToUse)
  }

  return (
    <Router>
      <div className='App'>
        <AppHeader />
        <div className='main-container'>
          <div className='main layout'>
            {data ? <TableData data={data} />: <span>Loading Data...</span> }
          </div>
        </div>
        <AppFooter />
      </div>
    </Router>
  )
}

export default App
