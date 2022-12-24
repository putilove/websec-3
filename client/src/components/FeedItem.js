import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import React, {useContext} from "react";
import {Button, Container, FormText, Image, Row} from "react-bootstrap";
import img from '../utils/search.png'
import PostItem from "./PostItem";

const FeedItem = observer(() => {
    const {posts} = useContext(Context)
    console.log(posts)
    return (
        <Container>
            {posts.posts.map(({key, value}) =>
            <PostItem/>)}
        </Container>
    )
})

export default FeedItem