import React, {useContext, useEffect} from 'react';
import {Button, Container, Form, FormText, Image, Row, Spinner} from "react-bootstrap";
import img from '../utils/search.png'
import {Context} from "../index";
import FeedItem from "../components/FeedItem";
import {observer} from "mobx-react-lite";
import {getFollowedUsersPosts} from "../http/postApi";
import {getImagesByPostIds} from "../http/imageApi";
import {signIn} from "../http/userAPI";
import {FEED_ROUTE} from "../utils/constants";
import {like} from "../http/likeApi";


const Feed = observer(() => {
    const {user} = useContext(Context)
    const {posts} = useContext(Context)
    useEffect(() => {
        getFollowedUsersPosts(user.user.id)
            .then((data) => {
                console.log(`followeduserposts`)
                console.log(data)
                posts.setPosts(data)
            })
    }, [])
    const setUnSetLike = async (userId, postId) => {
        console.log(userId, postId)
        try {
            await like(userId, postId)
            getFollowedUsersPosts(user.user.id)
                .then((data) => {
                    console.log(`followeduserposts`)
                    console.log(data)
                    posts.setPosts(data)
                })
        } catch (e) {
            alert(e.message)
        }
    }
    return (
        <Container>
            <datalist id="datal">
                <option>asb</option>
                <option>sbd</option>
            </datalist>
            <Row xs={2} className="d-flex justify-content-center align-items-center mt-2 pb-2 border-bottom">
                <Form className="w-25">
                    <Form.Control list="datal"
                                  placeholder="username">
                    </Form.Control>
                </Form>
                <Button className="d-flex justify-content-center align-items-center bg-light border-dark w-auto">
                    <Image src={img} style={{width: 20, height: 20}} alt="Search"/>
                </Button>
            </Row>
            <Container style={{width: 550}}>
                {posts.posts.map(post =>
                    <Container className="d-flex flex-column border border-dark mt-2 mb-2">
                        <FormText className="ms-2 mt-2 mb-2 border-bottom border-dark">
                            {post.user.username}
                        </FormText>
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
                        <Row xs={2} className="justify-content-start ms-2 me-2 mt-2">
                            <Container className="d-flex align-items-center justify-content-between">
                                <Button
                                    style={{fontSize: 17}}
                                    onClick={e => setUnSetLike(post.user.id, post.id)}
                                >
                                    ❤ {post.likesCount}
                                </Button>
                            </Container>
                        </Row>
                        <FormText className="ms-1 mt-2 mb-2 border-top border-dark">
                            {post.description}
                        </FormText>
                        <Container>

                        </Container>
                    </Container>
                )}
            </Container>
        </Container>
    );
});

export default Feed;