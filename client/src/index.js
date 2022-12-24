import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import FollowUsersPostsStore from "./store/FollowUsersPostsStore";
import ShowedUserStore from "./store/ShowedUserStore";
import AddPostStore from "./store/AddPostStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        posts: new FollowUsersPostsStore(),
        showedUser: new ShowedUserStore(),
        addPost: new AddPostStore()
    }}>
        <App />
    </Context.Provider>,
);

