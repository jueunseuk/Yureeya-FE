// src/RouterList.js
import { createBrowserRouter } from "react-router-dom";
import LoginBackGround from "@/pages/BackGround/LoginBackGround";
import DefaultBackGround from "@/pages/BackGround/DefaultBackGround";
import BoardBackGround from "@/pages/BackGround/BoardBackGround";
import Home from "@/pages/home";
import SignupLayout from "@/components/layout/SignupLayout";
import EmailVerify from "@/pages/auth/emailVerify";
import EmailVerifyPassword from "@/pages/auth/emailVerifyPassword";
import SignupForm from "@/pages/auth/signupForm";
import LoginLayout from "@/components/layout/LoginLayout";
import Login from "@/pages/auth/login";
import EmailLogin from "@/pages/auth/emailLogin";
import WrongPage from "@/pages/wrong/WrongPage";
import ResetPassword from "@/pages/auth/resetPassword";
import HomeLayout from "@/components/layout/HomeLayout";
import NaverCallback from "@/pages/callback/naverCallback";
import GoogleCallback from "@/pages/callback/googleCallback";
import KakaoCallback from "@/pages/callback/kakaoCallback";
import PostList from "@/pages/posts";
import Post from "@/pages/post";
import FooterPage from "@/pages/footerPage";
import Editor from "@/pages/editor";
import UpdateEditor from "./pages/updateEditor";
import My from "@/pages/my";
import User from "@/pages/user";
import Activity from "@/pages/activity";
import Setting from "@/pages/setting";
import Craftshop from "@/pages/craftshop";
import ScrollToTop from "@/common/act/scrollToTop";
import Manage from "@/pages/manage";
import SearchPage from "./pages/search";
import Ranking from "./pages/ranking";
import Achievement from "./pages/achievement";
import Footer from "./components/home/footer";

export const RouterList = () => [
    {
        path: "/auth",
        element: <LoginBackGround />,
        children: [
            {
                path: "signup",
                element: <SignupLayout />,
                children: [
                    {
                        path: "email/verify",
                        element: <EmailVerify />
                    },
                    {
                        path: "form",
                        element: <SignupForm />
                    }
                ]
            },
            {
                path: "login",
                element: <LoginLayout />,
                children: [
                    {
                        path: "",
                        element: <Login />
                    },
                    {
                        path: "email", 
                        element: <EmailLogin />
                    },
                    {
                        path: "email/verify",
                        element: <EmailVerifyPassword />
                    },
                    {
                        path: "reset-password",
                        element: <ResetPassword />
                    }
                ]
            },
            {
                path: "callback-naver",
                element: <NaverCallback />
            },
            {
                path: "callback-google",
                element: <GoogleCallback />
            },
            {
                path: "callback-kakao",
                element: <KakaoCallback />
            }
        ]
    },
    {
        path: "/",
        element: <DefaultBackGround />,
        children: [
            {
                path: "",
                element: (
                    <>
                        <HomeLayout />
                        <Footer />
                        <ScrollToTop />
                    </>),
                children: [
                    {
                        path: "",
                        element: <Home />
                    },
                    {
                        path: ":subPath",
                        element: <BoardBackGround />,
                        children: [
                            {
                                path: "",
                                element: <PostList />
                            },
                            {
                                path: ":postId",
                                element: <Post />
                            },
                        ]

                    },
                    {
                        path: "write/:type",
                        element: <Editor />
                    },
                    {
                        path: "edit/:type/:postId",
                        element: <UpdateEditor />
                    },
                    {
                        path: "/mypage",
                        element: <My />,
                    },
                    {
                        path: "/mypage/:subPath",
                        element: <Activity />
                    },
                    {
                        path: "/users/:userId",
                        element: <User />
                    },
                    {
                        path: "/users/:userId/:subPath",
                        element: <Activity />
                    },
                    {
                        path: "/user/:subPath",
                        element: <Craftshop />
                    },
                    {
                        path: "/user/:subPath",
                        element: <Craftshop />
                    },
                    {
                        path: "/setting",
                        element: <Setting />
                    },
                    {
                        path: "/manage",
                        element: <Manage />
                    },
                    {
                        path: "/search",
                        element: <SearchPage />
                    },
                    {
                        path: "/ranking",
                        element: <Ranking />
                    },
                    {
                        path: "/user/achievement",
                        element: <Achievement />
                    },

                    // footer
                    {
                        path: "terms",
                        element: <FooterPage />
                    },
                    {
                        path: "guide",
                        element: <FooterPage />
                    },
                    {
                        path: "faq",
                        element: <FooterPage />
                    },
                    {
                        path: "policy",
                        element: <FooterPage />
                    },
                    {
                        path: "disclaimer",
                        element: <FooterPage />
                    },
                    {
                        path: "about",
                        element: <FooterPage />
                    },
                ]
            },
        ]
    },
    {
        path: "*",
        element: <WrongPage />
    }
];

export const RouterObject = createBrowserRouter(RouterList());