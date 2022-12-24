import Feed from "./pages/Feed";
import UserPage from "./pages/UserPage";
import SignInPage from "./pages/SignInPage";
import Post from "./pages/Post"
import {FEED_ROUTE, POST_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE, SUBSCRIPTION_ROUTE, USER_ROUTE} from "./utils/constants";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import SignUpPage from "./pages/SignUpPage";

export const publicRoutes = [
    {
        path: SIGNIN_ROUTE,
        Component: SignInPage
    },
    {
        path: SIGNUP_ROUTE,
        Component: SignUpPage
    }
]

export const authRoutes = [
    {
        path: FEED_ROUTE,
        Component: Feed
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    },
    {
        path: POST_ROUTE,
        Component: Post
    },
    {
        path: SUBSCRIPTION_ROUTE,
        Component: SubscriptionsPage
    }
]