import React, {useContext} from 'react';
import {Button, Container, Navbar, Nav, FormText} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap'
import {signOut} from "../http/userAPI";
import {Link, useHistory} from "react-router-dom";
import {SIGNIN_ROUTE} from "../utils/constants";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {showedUser} = useContext(Context)
    const history = useHistory()
    const signOutClick = () => {
        signOut(user.user.id).then((data) => {
            user.setUser({})
            user.setIsAuth(false)
            data === 1 ? alert('Success') : console.log('Fail')
            history.push(SIGNIN_ROUTE)
        })
    }
    const setShowedUser = (showedUserId, showedUserUsername) => {
        showedUser.setUserId(showedUserId)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand id="feed" href="/feed">InstaHlam</Navbar.Brand>
                {user.isAuth ?
                    <Nav.Item className="ml-auto">

                        <Navbar.Brand href={`/user/${user.user.id}`}>
                            {user.user.username}
                        </Navbar.Brand>

                        <Button variant={"outline-light"} className="ms-3" onClick={signOutClick}>
                            Sign Out
                        </Button>
                    </Nav.Item> :
                    <Nav.Item className="ml-auto">
                        <Link to='/signIn'>
                            <Button className="btn-outline-light bg-dark">
                                Sign In
                            </Button>
                        </Link>
                        <Link to='/signUp'>
                            <Button className="btn-outline-light bg-dark ms-4">
                                Sign Up
                            </Button>
                        </Link>
                    </Nav.Item>}
            </Container>
        </Navbar>
    );
});

export default NavBar;
