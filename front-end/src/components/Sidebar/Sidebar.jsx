import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './Sidebar.css';

import { FaScissors } from "react-icons/fa6";
import { IoHome, IoLogIn, IoLogOut } from "react-icons/io5";

export const Sidebar = ({ handleLogin, isLogged }) => {

    const navigate = useNavigate();

    const handleLoggout = () => {
        Cookies.remove("token");
        navigate(0);
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
                    <button onClick={handleLoggout} className='logout'>
                        <IoLogIn className='icon' />
                        <p>Sair</p>
                    </button>
                ) : (
                    <button onClick={handleLogin} className='login'>
                        <IoLogOut className='icon' />
                        <p>Entrar</p>
                    </button>
                )}
            </div>
        </aside>
    )
}