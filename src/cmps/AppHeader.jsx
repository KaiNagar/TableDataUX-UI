import { NavLink } from 'react-router-dom'
import logo from '../assets/imgs/First Assigment1logo.png'

export const AppHeader = () => {
  return (
    <section className='app-header-constainer '>
      <div className='app-header layout flex align-center space-between'>
        <div className='logo'><img src={logo} alt="" /></div>
        <div className='navigation'>
          <NavLink className='header-link' to='/'>
            Home
          </NavLink>
          <NavLink className='header-link' to='/table'>
            Table
          </NavLink>
        </div>
      </div>
    </section>
  )
}
