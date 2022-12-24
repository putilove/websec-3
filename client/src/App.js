import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {checkAuth} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const {posts} = useContext(Context)
    const {showedUser} = useContext(Context)
    const {addPost} = useContext(Context)
    addPost.setImages([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return <Spinner animation={"grow"}/>

    return (
        <BrowserRouter>
            <NavBar />
           <AppRouter />
        </BrowserRouter>
    );
});

export default App;
