import { NavLink } from 'react-router-dom'
import './header.css'

export default function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                <h1 className="logo">ihateyoue.dev</h1>
                <nav className="nav">
                    <NavLink to="/" className="nav-link">home</NavLink>
                    <NavLink to="/software" className="nav-link">software</NavLink>
                    <NavLink to="/kits" className="nav-link">kits</NavLink>
                    <NavLink to="/archive" className="nav-link">archive</NavLink>
                    <NavLink to="/contact" className="nav-link">contact</NavLink>
                </nav>
            </div>
        </header>
    )
}
