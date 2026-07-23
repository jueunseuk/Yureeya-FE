import MyPosts from "@/components/user/MyPosts";
import { useParams } from "react-router-dom";
import MyComments from "@/components/user/MyComments";
import MyEmpathizedPosts from "@/components/user/MyEmpathizedPosts";
import MyImages from "@/components/user/MyImages";
import UserPosts from "@/components/user/UserPosts";
import UserComments from "@/components/user/UserComments";
import UserEmpathizedPosts from "@/components/user/UserEmpathizedPosts";
import UserImages from "@/components/user/UserImages";

const Activity = ({ userId }) => {
    const {subPath} = useParams();

    const getMyComponent = () => {
        switch(subPath) {
            case "posts": return <MyPosts />;
            case "comments": return <MyComments />;
            case "empathized": return <MyEmpathizedPosts />;
            case "images": return <MyImages />;
            default : return <WrongPage />;
        }
    };

    const getUserComponent = () => {
        switch(subPath) {
            case "posts": return <UserPosts />;
            case "comments": return <UserComments />;
            case "empathized": return <UserEmpathizedPosts />;
            case "images": return <UserImages />;
            default : return <WrongPage />;
        }
    };
    
    return (
        <>
            {userId === undefined ? getMyComponent() : getUserComponent()}
        </>
    )
};

export default Activity;