import React, {useContext} from 'react';
import {Button, Container, Navbar, Nav} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap'
import {signOut} from "../http/userAPI";
import {useHistory} from "react-router-dom";
import {SIGNIN_ROUTE} from "../utils/constants";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const signOutClick = () => {
        signOut(user.user.id).then((data) => {
            user.setUser({})
            user.setIsAuth(false)
            data === 1 ? alert('Success') : console.log('Fail')
            history.push(SIGNIN_ROUTE)
        })
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="feed">InstaHlam</Navbar.Brand>
                {user.isAuth ?
                    <Nav.Item className="ml-auto">
                        <Navbar.Text>
                            {user.user.username}
                        </Navbar.Text>
                        <Button variant={"outline-light"} className="ms-3" onClick={signOutClick}>
                            Sign Out
                        </Button>
                    </Nav.Item> :
                    <Nav.Item className="ml-auto">
                        <Navbar.Text>
                            Sign In or Sign Up
                        </Navbar.Text>
                    </Nav.Item>}
            </Container>
        </Navbar>
    );
});

export default NavBar;
