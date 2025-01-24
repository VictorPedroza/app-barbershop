import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import './Sidebar.css';

import { FaScissors } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

export const Sidebar = ({ handleLogin }) => {
    const [isLogged, setIsLogged] = useState(false);

    const handleLoggout = () => {
        console.log("Saindo...")
    }


    return (
        <aside>
            <Link to='/' className="title-aside">
                <FaScissors className='icon' />
                <h1><span>Barber</span>Shop</h1>
            </Link>
            <nav className='menu'>
                <ul className='list-menu'>
                    <NavLink className='menu-item' to='/' >
                        <li className='item-content'>
                            <IoHome className='icon' />
                            <p>Início</p>
                        </li>
                    </NavLink>
                </ul>
            </nav>
            <div className="session">
                {isLogged ? (
                    <button onClick={handleLoggout}>
                        Sair
                    </button>
                ) : (
                    <button onClick={handleLogin}>
                        Entrar
                    </button>
                )}
            </div>
        </aside>
    )
}