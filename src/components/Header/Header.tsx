import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { NavLink } from 'react-router';
import './style.scss';

function Header() {
    return (
        <Navbar className="navbar flex justify-around " shouldHideOnScroll>
            <NavbarBrand className="logo_user">
                <p>User manager</p>
            </NavbarBrand>
            <NavbarContent className="" justify="center">
                <NavbarItem>
                    <NavLink to={'user-page'}>User</NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to={'about-page'}>About</NavLink>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
export default Header;
