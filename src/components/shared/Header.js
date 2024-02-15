import React, { Fragment, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const Header = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    };

    return (
        <Navbar expand='md' style={{ backgroundColor: '#343a40' }}>
            <Navbar.Brand className='m-0'>
                <Link 
                    to='/' 
                    style={{ ...linkStyle, display: 'inline-block', fontSize: '37px'}}>
                &nbsp;Listen!
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle 
                aria-controls='basic-navbar-nav' 
                onClick={handleMenuToggle} 
            />
            <Navbar.Collapse 
                id='basic-navbar-nav' 
                className={menuOpen ? 'show' : ''}>
                <Nav className='mr-auto'>
                    <Nav.Item className='m-2'>
                        <Link 
                            to='/create-podcast' 
                            style={{ color: 'white', textDecoration: 'none' }}
                        > 
                        &nbsp; &nbsp;Upload </Link>
                    </Nav.Item>
                </Nav>
                <Nav style={{ marginLeft: 'auto' }}>
                    {user && (
                        <span 
                            className='navbar-text ml-2' 
                            style={{ color: 'purple', fontSize: '24px'}}
                        >
                        Welcome, {user.username}</span>
                    )}
                    <div 
                        className='m-2' 
                        style={{ display: 'flex', alignItems: 'center' }}>
                        {user ? authenticatedOptions : unauthenticatedOptions}
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
