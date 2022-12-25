import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, FormText, Image, Row} from "react-bootstrap";
import img from '../utils/search.png'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {getFollowedUsersPosts} from "../http/postApi";
import {like} from "../http/likeApi";
import {createComment, deleteComment} from "../http/commentApi";
import {getAllUsers} from "../http/userAPI";
import {useHistory} from "react-router-dom";


const Feed = observer(() => {
    const {user} = useContext(Context)
    const {posts} = useContext(Context)
    const [users, setUsers] = useState([])
    const history = useHistory()
    useEffect(() => {
        getFollowedUsersPosts(user.user.id)
            .then((data) => {
                posts.setPosts(data)
            })
        getAllUsers().then((data) => setUsers(data))
    }, [posts, user.user.id])
    const setUnSetLike = async (userId, postId) => {
        try {
            await like(userId, postId)
            getFollowedUsersPosts(user.user.id)
                .then((data) => {
                    posts.setPosts(data)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    const sendComment = async (postId, userId, text) => {
        try {
            await createComment(postId, userId, text)
            getFollowedUsersPosts(user.user.id)
                .then((data) => {
                    posts.setPosts(data)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    const delComment = async (id) => {
        try {
            await deleteComment(id)
            getFollowedUsersPosts(user.user.id)
                .then((data) => {
                    posts.setPosts(data)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    const openUserPage = () => {
        let optionId = document.getElementById("usernameInput").value
        let user = users.filter(usr => usr.username === optionId)[0]
        history.push(`/user/${user.id}`)
    }
    return (
        <Container>
            <datalist id="userList">
                {users.map(user =>
                    <option id={`${user.username}`}>{user.username}</option>
                )}
            </datalist>
            <Row xs={2} className="d-flex justify-content-center align-items-center mt-2 pb-2 border-bottom">
                <Form className="w-25">
                    <Form.Control
                        id={`usernameInput`}
                        list="userList"
                        placeholder="username">
                    </Form.Control>
                </Form>
                <Button
                    onClick={openUserPage}
                    className="d-flex justify-content-center align-items-center bg-light border-dark w-auto">
                    <Image src={img} style={{width: 20, height: 20}} alt="Search"/>
                </Button>
            </Row>
            <Container style={{width: 550}}>
                {posts.posts.map(post =>
                    <Container className="d-flex flex-column border border-dark mt-2 mb-2">
                        <Container className="ms-2 mt-2 mb-2 border-bottom border-dark">
                            <a href={`user/${post.userId}`}>{post.username}</a>
                        </Container>
                        <Container style={{overflowX: "auto"}}
                                   className="d-inline-flex align-items-center justify-content-start">
                            {post.images.map(image =>
                                <Container className="d-inline-flex p-0" style={{width: 500}}>
                                    <Image src={`${process.env.REACT_APP_API_URL}/${image.img}`}
                                           alt={image.id}
                                           style={{width: 475, height: 475}}
                                    />
                                </Container>
                            )}
                        </Container>
                        <Row xs={2} className="d-flex justify-content-between align-items-center ms-2 me-2 mt-2">
                            <Button
                                style={{fontSize: 17, width: 90}}
                                onClick={() => setUnSetLike(post.userId, post.id)}
                            >
                                ❤ {post.likesCount}
                            </Button>
                            <FormText className="p-1" style={{textAlign: "right"}}>
                                {post.createdAt.substring(0, 10)}
                            </FormText>
                        </Row>
                        <FormText className="ms-3 mt-2 mb-2 border-top border-dark">
                            {post.username}: {post.description}
                        </FormText>
                        <FormText className="ms-3 mt-2 mb-2 border-top border-dark">
                            Comments:
                        </FormText>
                        <Container className="d-flex flex-column ms-4 mb-3 border border-light">
                            {post.comments.map(comment => (
                                <Row className="d-flex flex-row justify-content-between align-items-center border border-dark me-3">
                                    <FormText style={{width: "fit-content"}}>{comment.user.username}: {comment.text}</FormText>
                                    <Row style={{width: "fit-content"}} className="d-flex flex-row">
                                        <FormText style={{width: "fit-content"}}>
                                            {comment.createdAt.substring(0, 10)}
                                        </FormText>
                                        {comment.userId === user.user.id ?
                                            <Button
                                                className="align-items-center justify-content-center p-0 pb-3 pt-0"
                                                style={{width: 20, height: 20}}
                                                onClick={() => delComment(comment.id)}
                                            >
                                                x
                                            </Button> :
                                            <FormText> </FormText>}
                                    </Row>
                                </Row>
                            ))}
                        </Container>
                        <Row xs={2} className="d-flex flex-row align-items-center me-3 ms-3 mb-2">
                            <Form>
                                <Form.Control id={`p${post.id}u${user.user.id}`}
                                              className="mt-0"
                                              placeholder="Input comment"
                                />
                            </Form>
                            <Button
                                onClick={() =>
                                    sendComment(
                                        post.id,
                                        user.user.id,
                                        document.getElementById(`p${post.id}u${user.user.id}`).value)}
                            >
                                Send
                            </Button>
                        </Row>
                    </Container>
                )}
            </Container>
        </Container>
    );
});

export default Feed;