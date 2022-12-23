import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import React, {useContext} from "react";
import {Button, Container, FormText, Image, Row} from "react-bootstrap";
import img from '../utils/search.png'

const PostItem = observer(() => {
    const {Post} = useContext(Context)
    return (
        <Container className="d-flex flex-column">
            <FormText>
                {/*{Post.username}*/123}
            </FormText>
            <Image src={/*Post.image}*/img} alt="123"/>
            <Row xs={2} className="justify-content-start">
                <Container>
                    <FormText>❤ {/*{Post.likesCount}*/123}</FormText>
                </Container>
                <Button>
                    Comments
                </Button>
            </Row>
            <FormText>
                {/*{Post.description}*/123}
            </FormText>
        </Container>
    )
})

export default PostItem