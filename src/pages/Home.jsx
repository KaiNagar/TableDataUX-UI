import { NavLink } from "react-router-dom"

export const Home = () => {
    return (
        <section className="home-page">
            <h1 className="home-header">Client Side - Assigment 1</h1>
            <h2>Hope you will enjoy my work</h2>
            <div className="action">
                <NavLink className='home-link' to={'/table'}>To move to the table click me!</NavLink>
                <h3>Or on 'Table' in the header</h3>
            </div>
        </section>
    )
}