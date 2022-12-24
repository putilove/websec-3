import React, {useState} from 'react';
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {deletePost, getUserPosts} from "../http/postApi";
import {observer} from "mobx-react-lite";
import {like} from "../http/likeApi";
import {Button, Container, Form, FormText, Image, Row} from "react-bootstrap";
import {follow, getCountFollowers, getCountSubscriptions} from "../http/subscriptionApi";
import {getUserById} from "../http/userAPI";
import {createComment, deleteComment} from "../http/commentApi";
import CreatePost from "../modals/createPost";
import {useParams} from "react-router-dom";

const UserPage = observer(() => {
    const {user} = useContext(Context)
    const {showedUser} = useContext(Context)
    const {id} = useParams()
    const [createPostVisible, setCreatePostVisible] = useState(false)
    useEffect(() => {
        showedUser.setUserId(parseInt(id))
        getUserById(showedUser.userId).then((data) => {
            showedUser.setUsername(data.username)
        })
        console.log(showedUser.userId)
        getUserPosts(showedUser.userId)
            .then((data) => {
                console.log(`userpostsbef`)
                showedUser.setPosts(data)
                console.log(showedUser.posts)
            });
        getCountFollowers(showedUser.userId).then((data) => {
            showedUser.setFols(data)
        })
        getCountSubscriptions(showedUser.userId).then((data) => {
            showedUser.setSubs(data)
        })
    }, [])
    const setUnSetLike = async (userId, postId) => {
        console.log(userId, postId)
        try {
            await like(userId, postId)
            getUserPosts(showedUser.userId)
                .then((data) => {
                    console.log(`userpoststhen`)
                    showedUser.setPosts(data)
                    console.log(showedUser.posts)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    const followUnFollow = async (id, otherId) => {
        try {
            await follow(id, otherId)
            getCountFollowers(showedUser.userId)
                .then((data) => {
                    console.log(`userpoststhen`)
                    showedUser.setFols(data)
                    console.log(showedUser.posts)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    const sendComment = async (postId, userId, text) => {
        try {
            await createComment(postId, userId, text)
            getUserPosts(showedUser.userId)
                .then((data) => {
                    console.log(`followedposts`)
                    console.log(data)
                    showedUser.setPosts(data)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    const delComment = async (id) => {
        try {
            await deleteComment(id)
            getUserPosts(showedUser.userId)
                .then((data) => {
                    console.log(`followedposts`)
                    console.log(data)
                    showedUser.setPosts(data)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    const delPost = async (id) => {
        try {
            await deletePost(id)
            getUserPosts(showedUser.userId)
                .then((data) => {
                    console.log(`followedposts`)
                    console.log(data)
                    showedUser.setPosts(data)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    return (
        <Container className="d-flex flex-column">
            <Row xs={2}
                 className="d-flex flex-row justify-content-between align-items-center pb-3 mt-3 mb-2 border-bottom border-dark">
                <Container style={{width: "fit-content"}}>
                    <FormText>Page of user: {showedUser.username} |</FormText>
                    <FormText> Followers: {showedUser.fols} |</FormText>
                    <FormText> Subscriptions: {showedUser.subs}</FormText>
                </Container>
                {showedUser.userId === user.user.id ?
                    <Button
                        onClick={() => setCreatePostVisible(true)}
                        className="btn-outline-dark">
                        Add post
                    </Button> :
                    <FormText> </FormText>
                }
            </Row>
            {showedUser.userId === user.user.id ?
                "" :
                <Row xs={2}
                     className="d-flex flex-row justify-content-center align-items-center pb-3 mt-3 mb-2 border-bottom border-dark">
                    <Button onClick={e => followUnFollow(user.user.id, showedUser.userId)}>
                        Follow/UnFollow
                    </Button>
                </Row>}
            <Container style={{width: 550}}>
                {showedUser.posts.map(post =>
                    <Container className="d-flex flex-column border border-dark mt-2 mb-2">
                        <Row xs={2} className="m-2 border-bottom border-dark justify-content-between">
                            <a href={`/user?id=${post.userId}`}>
                                {post.username}
                            </a>
                            {showedUser.userId === user.user.id ?
                                <Button
                                    className="mb-2"
                                    style={{width: "fit-content", height: "fit-content"}}
                                    onClick={e => delPost(post.id)}
                                >
                                    x
                                </Button> :
                                <FormText> </FormText>}
                        </Row>
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
                                onClick={e => setUnSetLike(post.userId, post.id)}
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
                                <Row
                                    className="d-flex flex-row justify-content-between align-items-center border border-dark me-3">
                                    <FormText
                                        style={{width: "fit-content"}}>{comment.user.username}: {comment.text}</FormText>
                                    <Row style={{width: "fit-content"}} className="d-flex flex-row">
                                        <FormText style={{width: "fit-content"}}>
                                            {comment.createdAt.substring(0, 10)}
                                        </FormText>
                                        {comment.userId === user.user.id ?
                                            <Button
                                                className="align-items-center justify-content-center p-0 pb-3 pt-0"
                                                style={{width: 20, height: 20}}
                                                onClick={e => delComment(comment.id)}
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
                                onClick={e =>
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
            <CreatePost show={createPostVisible} onHide={() => {
                setCreatePostVisible(false);
                getUserPosts(showedUser.userId)
                    .then((data) => {
                        console.log(`followedposts`)
                        console.log(data)
                        showedUser.setPosts(data)
                    })
            }
            }/>
        </Container>
    );
});

export default UserPage;