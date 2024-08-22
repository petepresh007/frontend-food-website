import { Link, useNavigate } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useAppContext } from "./context";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth, order, adminauth } from "../server";
import { FaSearch } from "react-icons/fa"

export const Nav = () => {
    const { state, dispatch } = useAppContext();
    const go = useNavigate();
    axios.defaults.withCredentials = true;


    //sticky effect
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        async function getUser() {
            try {
                const { data } = await axios.get(`${auth}/stay-loggedin`, {
                    withCredentials: true
                });
                dispatch({ type: 'SET_USER', payload: data });
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [dispatch]);


    useEffect(() => {
        async function getUser() {
            try {
                const { data } = await axios.get(`${adminauth}/stay-loggedin`, {
                    withCredentials: true
                });
                dispatch({ type: 'SET_ADMIN', payload: data });
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [dispatch]);



    useEffect(() => {
        async function getCart() {
            try {
                const { data } = await axios.get(`${order}/my-orders-cart`, {
                    withCredentials: true
                });
                dispatch({ type: 'SET_CART', payload: data });
            } catch (error) {
                console.log(error)
            }
        }
        getCart()
    }, [dispatch]);

    //logout the admin
    async function logoutAdmin() {
        try {
            await axios.post(`${adminauth}/logout`);
            dispatch({type:'SET_ADMIN', payload: null});
            go('/loginadmin');
        } catch (error) {
            console.log(error)
        }
    }


    return <header>
        <div className={`header-stuff ${isSticky ? 'sticky' : ''}`}>
            <div className="location">
                <div className="cart-item">
                    <FaLocationArrow />
                    <span>Address stays here</span>
                    <AiOutlineShoppingCart onClick={() => go('/cart')} />
                </div>
                <span className="cart-num">{state.cart.length ? state.cart.length : ''}</span>
            </div>
            <nav>
                <ul>
                    <FaSearch className="home-sr" onClick={() => go('/search')} />
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/orders'>Order</Link></li>
                    <li><Link to='/restaurant'>Restaurant</Link></li>
                    <li><Link to='/menu'>Menu</Link></li>
                    <li>
                        {
                            state.user ? <Link to='/profile'>profile</Link> : <AiOutlineUser
                                style={{ color: "gray", cursor: "pointer" }}
                                onClick={() => {
                                    go('/login')
                                }}
                            />
                        }
                    </li>
                    {
                        state.admin ? (
                            <>
                                <Link to='/admin'>Admin</Link>
                                <Link to='/loginadmin' onClick={logoutAdmin}>logout</Link>
                            </>
                        ) : ""
                    }
                </ul>
            </nav>
        </div>
    </header>
}