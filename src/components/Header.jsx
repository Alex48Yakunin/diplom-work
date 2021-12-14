import React from "react";
import {NavLink, Link, withRouter} from "react-router-dom";
import headerLogo from "../img/header-logo.png";
import {changeSearchInput, setSearching} from "../actions/actionCreators";
import {useSelector, useDispatch} from "react-redux";
import Search from "./Search";

function Header({history}) {
    const {isSearching, searchString} = useSelector((state) => state.search);
    const {cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchString) {
            history.replace(`/catalog?q=${searchString}`);
            dispatch(setSearching());
        }
    };

    const handleSearchClick = () => {
        dispatch(setSearching());
    };

    const handleChange = (e) => {
        dispatch(changeSearchInput(e.target.value));
    };

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink to="/" className="navbar-brand" exact>
                            <img src={headerLogo} alt="Bosa Noga"/>
                        </NavLink>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link" exact>
                                        Главная
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/catalog" className="nav-link">
                                        Каталог
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about" className="nav-link">
                                        О магазине
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contacts" className="nav-link">
                                        Контакты
                                    </NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div
                                        onClick={handleSearchClick}
                                        className="header-controls-pic header-controls-search"></div>
                                    <Link to="/cart" className="header-controls-pic header-controls-cart">
                                        {cartItems && cartItems.length !== 0 && (
                                            <div className="header-controls-cart-full">
                                                {cartItems.length}
                                            </div>
                                        )}
                                        <div className="header-controls-cart-menu"></div>
                                    </Link>
                                </div>
                                {isSearching && (<Search
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    searchString={searchString}
                                    className="header-controls-search-form form-inline"/>)}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;