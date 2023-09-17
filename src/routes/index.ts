import NewDBPage from "src/pages/AdminPage/DatabasePage/NewDBPage";
import {
  DatabasePage,
  ProfilePage,
  ShortlistedPage,
  RecommendPage,
  SettingPage,
  ScholarshipDetailPage,
} from "../pages";
import ApiPage from "src/pages/AdminPage/ApiPage/ApiPage";

const routes = [
  // {
  //     path: '/login',
  //     component: LoginPage
  // },
  // {
  //     path: '/register',
  //     component: RegisterPage
  // },
  // {
  //     path: '/',
  //     component: HomePage
  // },
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/shortlisted",
    component: ShortlistedPage,
  },
  {
    path: "/recommend",
    component: RecommendPage,
  },
  {
    path: "/settings",
    component: SettingPage,
  },
  {
    path: "/scholarship/:id",
    component: ScholarshipDetailPage,
  },
  {
    path: '/admin/database',
    component: NewDBPage,
  },
  {
    path: '/admin/api',
    component: ApiPage
  }
];

export { routes };
