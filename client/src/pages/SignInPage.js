import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SIGNUP_ROUTE} from "../utils/constants";
import {signIn} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const SignInPage = observer(() => {
    const {user} = useContext(Context)
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const click = async () => {
        try {
            let data = await signIn(username, password)
            user.setUser(data)
            user.setIsAuth(true)
            document.getElementById("feed").click()
        } catch (e) {
            alert(e.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 500}} className="p-5">
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-0"
                        placeholder="Input username"
                        value={username}
                        onChange={ e => setUserName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Input password"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row xs={2} className="d-flex justify-content-between mt-3 ps-1 pe-3">
                        <NavLink to={SIGNUP_ROUTE}>
                            Not account? Sign up!
                        </NavLink>
                        <Button
                            onClick={click}
                            variant={"outline-success"}
                        >
                            Sign In
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default SignInPage;