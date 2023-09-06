import {LoginPage, RegisterPage, HomePage, ProfilePage, ShortlistedPage, RecommendPage, SettingPage} from "../pages";

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
    },
    {
        path: '/profile',
        component: ProfilePage
    },
    {
        path: '/shortlisted',
        component: ShortlistedPage
    },
    {
        path: '/recommend',
        component: RecommendPage
    },
    {
        path: '/settings',
        component: SettingPage
    }
]

export {routes};