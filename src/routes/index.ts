import {LoginPage, RegisterPage, HomePage} from "../pages";

const routes = [
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/',
        component: HomePage
    }
]

export {routes};