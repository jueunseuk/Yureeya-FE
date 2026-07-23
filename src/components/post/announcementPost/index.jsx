import * as A from "@/apis/announcement"
import * as S from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import MoreOption from "@/components/modal/moreOption";
import author from "@/assets/icon/post/author.svg";
import ellipse from "@/assets/icon/post/ellipse.svg";
import list from "@/assets/icon/gallery/list.svg";
import view from "@/assets/icon/post/view.svg";
import WrongPage from "@/pages/wrong/WrongPage";
import { formatDate } from "@/util/dateFormatter";
import { PostContent } from "../postContent";
import { SkeletonItem } from "@/common/skeleton/Skeleton";
import useUserInfo from "@/hooks/localStorage";
import { UserProfileImage2 } from "@/common/func/UserProfile2";

const AnnouncementPost = () => {
    const user = useUserInfo();
    const navigate = useNavigate();
    const {subPath} = useParams();
    const boardInfo = BOARD_BY_PATH[subPath];
    const {postId} = useParams();
    const [skeleton, setSkeleton] = useState(true);
    const [announcementData, setAnnouncementData] = useState({});
    const [notFound, setNotFound] = useState(false);

    const handleNavigatePostList = () => {
        navigate(`/${subPath}`);
    }

    useEffect(() => {
        if (!user || !user.userId) {
            alert("로그인 후 이용가능합니다.");
            navigate("/");
            return;
        }
        
        const fetchPost = async () => {
            try {
                setSkeleton(true);
                const response = await A.getAnnouncement(postId);
                setAnnouncementData(response.data);
                
            } catch(error) {
                if(error.response.data.code === "POST_001") {
                    setNotFound(true);
                }
            } finally {
                setSkeleton(false);
            }
        }

        fetchPost();
    }, []);
    
    if(notFound) {
        return <WrongPage type={"post"}/>;
    };

    return (
        <>
            <S.Wrapper>
                {skeleton ? 
                    <S.VerticalWrapper $gap={"15px"}>
                        <SkeletonItem $size={"1200px"} $width={"100%"} $height={"83px"}/>
                        <S.Contour style={{marginTop: "0"}}/>
                        <SkeletonItem $size={"1200px"} $width={"100%"} $height={"300px"}/>
                    </S.VerticalWrapper>
                    : (
                    <>
                        <S.VerticalWrapper>
                            <S.Text $size={"14px"} style={{cursor: "pointer"}} onClick={handleNavigatePostList}>{boardInfo.label} &gt;</S.Text>
                            <S.HorizontalWrapper $justify={"space-between"} style={{width: "100%"}}>
                                <S.Text $size={"18px"} $weight={"700"} style={{marginTop: "1px"}}>[{announcementData.name}] {announcementData.title}</S.Text>
                                {(user?.role === "MANAGER" || user?.role === "ADMIN") && <MoreOption formData={announcementData} type={subPath}/>}
                            </S.HorizontalWrapper>
                            <S.HorizontalWrapper $gap={"12px"} style={{marginTop: "10px"}}>
                                <UserProfileImage2 userId={announcementData.userId} profileUrl={announcementData.profileUrl} profile={announcementData.profileUrl} width={"35px"} height={"35px"} radius={"35px"} />
                                <S.HorizontalWrapper>
                                    <S.Icon src={author} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"14px"} $weight={"600"} style={{cursor: "pointer"}} onClick={() => navigate(`/users/${announcementData.userId}`)}>{announcementData.nickname}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper>
                                    <S.Icon src={view} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"12px"} $color={"#878787"} $weight={"600"}>{announcementData.viewCnt}</S.Text>
                                </S.HorizontalWrapper>
                                <S.Icon src={ellipse} $width={"3px"} $height={"3px"}/>
                                <S.Text $size={"12px"} $color={"#878787"}>{formatDate(announcementData.createdAt, 4)}</S.Text>
                            </S.HorizontalWrapper>
                        </S.VerticalWrapper>
                        <S.Contour />
                        <S.VerticalWrapper>
                        <S.Content>
                            <PostContent content={announcementData.content}/>
                        </S.Content>
                        </S.VerticalWrapper>
                        <S.HorizontalWrapper $gap={"10px"} style={{marginBottom: "30px"}}>
                            <S.NavigateButton onClick={handleNavigatePostList}><S.Icon src={list} $width={"13px"} $height={"10px"}/>목록</S.NavigateButton>
                        </S.HorizontalWrapper>
                    </>
                )}
            </S.Wrapper>
        </>
    );
}

export default AnnouncementPost;