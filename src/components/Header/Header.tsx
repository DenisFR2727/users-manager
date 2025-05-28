import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { NavLink } from 'react-router';

function Header() {
    return (
        <Navbar className="flex justify-around" shouldHideOnScroll>
            <NavbarBrand>
                <p className="">User manager</p>
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
