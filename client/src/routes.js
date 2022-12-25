import Feed from "./pages/Feed";
import UserPage from "./pages/UserPage";
import SignInPage from "./pages/SignInPage";
import {FEED_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE, USER_ROUTE} from "./utils/constants";
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
    }
]