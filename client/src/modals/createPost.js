import React, {useContext, useState} from 'react';
import {Button, Container, Form, Modal} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {createPost} from "../http/postApi";

const CreatePost = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const {addPost} = useContext(Context)
    addPost.setUserId(user.user.id)
    const [images, setImages] = useState([])

    const addImage = (e) => {
        const image = e.target.files[0]
        if (images.length < 10) {
            if (image.name.endsWith('.jpg') || image.name.endsWith('.jpeg') || image.name.endsWith('.png')) {
                setImages([...images, image])
                addPost.setImages([...addPost.images, image])
            }
        }
        e.target.value = null
    }

    const removeImage = (name) => {
        setImages(images.filter(im => im.name !== name))
        addPost.setImages(addPost.images.filter(im => im.name !== name))
    }

    const setDescription = (description) => {
        addPost.setDescription(description)
    }

    const addNewPost = async () => {
        if(addPost.description && addPost.images.length > 0 && addPost.userId) {
            console.log(addPost.images)
            const formData = new FormData()
            images.forEach(image => formData.append('images', image))
            formData.append('description', addPost.description)
            formData.append('userId', addPost.userId)
            console.log('------------------------')
            console.log(formData.getAll('images'))
            createPost(formData).then(() => {
                addPost.setUserId(0)
                addPost.setDescription('')
                addPost.setImages([])
                setImages([])
                onHide()
            })
        }
        else {
            alert("Not full data of new post")
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="pe-3">
                    <Form.Control className="mt-2 mb-2"
                                  placeholder="Input description"
                    onChange={e => setDescription(e.target.value)}>
                    </Form.Control>
                    <Form.Control className="mt-2 mb-2"
                                  type="file"
                                  accept=".jpg,.jpeg,.png"
                                  onChange={addImage}
                    >
                    </Form.Control>
                    <Form.Text className="mb-2 mt-2 ms-2">Chosen files:</Form.Text>
                    <Container className="m-2 d-flex flex-column p-2 ps-3 border rounded-2 border-info">
                        {images.map(image =>
                            <Container key={`img${image.name}`} className="d-flex justify-content-between mt-2 mb-2">
                                <Form.Text className="mt-1 mb-2">{image.name}</Form.Text>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={e => removeImage(image.name)}
                                >
                                    Delete
                                </Button>
                            </Container>
                        )}
                    </Container>
                </Form>
                <hr/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addNewPost}>Add</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePost;