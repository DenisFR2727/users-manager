import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { NavLink } from 'react-router';
import './style.scss';

function Header() {
    return (
        <Navbar className="navbar flex justify-around " shouldHideOnScroll>
            <NavbarBrand className="logo_user">
                <p className="nav__logo">User manager</p>
            </NavbarBrand>
            <NavbarContent className="" justify="center">
                <NavbarItem>
                    <NavLink to={'user-page'}>
                        <span className="link__nav-user">User</span>
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to={'about-page'}>
                        <span className="link__nav-about">About</span>
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
export default Header;
