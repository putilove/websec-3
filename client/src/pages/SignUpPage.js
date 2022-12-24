import React, {useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SIGNIN_ROUTE} from "../utils/constants";
import {signUp} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const SignUpPage = observer(() => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async () => {
        try {
            const response = await signUp(username, email, password)
            document.getElementById('feed').click()
            console.log(response)
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
                        placeholder="Input email"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Input password"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row xs={2} className="d-flex justify-content-between mt-3 ps-1 pe-3">
                        <NavLink to={SIGNIN_ROUTE}>
                            <div>
                            Have an account?
                            </div>
                            <div style={{whiteSpace: "pre-line"}}>Sign In!</div>
                        </NavLink>
                        <Button
                            onClick={click}
                            variant={"outline-success"}
                        >
                            Sign Up
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default SignUpPage;