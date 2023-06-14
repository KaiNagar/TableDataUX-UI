import {  NavLink } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <section className='app-header-constainer '>
      <div className='app-header layout flex align-center'>
        <NavLink className='header-link' to='/'>
          Home
        </NavLink>
        
        <NavLink className='header-link' to='/login'>
          Login
        </NavLink>
      </div>
    </section>
  )
}
