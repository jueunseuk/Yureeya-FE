import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import * as E from "@/apis/event"
import * as EC from "@/apis/eventComment"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import MoreOption from "@/components/modal/moreOption";
import clock from "@/assets/icon/etc/clock.svg";
import author from "@/assets/icon/post/author.svg";
import ellipse from "@/assets/icon/post/ellipse.svg";
import list from "@/assets/icon/gallery/list.svg";
import comments from "@/assets/icon/post/comment.svg";
import view from "@/assets/icon/post/view.svg";
import images from "@/assets/icon/user/images.svg";
import images_select from "@/assets/icon/user/images_select.svg";
import max_user from "@/assets/icon/user/max_user.svg";
import WrongPage from "@/pages/wrong/WrongPage";
import ImageFullScreen from "@/components/modal/imageFullScreen";
import { formatDate } from "@/util/dateFormatter";
import { PostContent } from "../postContent";
import { SkeletonItem } from "@/common/skeleton/Skeleton";
import useUserInfo from "@/hooks/localStorage";
import { UserProfileImage2 } from "@/common/func/UserProfile2";

const EventPost = () => {
    const user = useUserInfo();
    const navigate = useNavigate();
    const {subPath} = useParams();
    const boardInfo = BOARD_BY_PATH[subPath];
    const {postId} = useParams();
    const [skeleton, setSkeleton] = useState(true);
    const [eventData, setEventData] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectImage, setSelectImage] = useState(null);
    const [comment, setComment] = useState("");
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [commentData, setCommentData] = useState([]);

    const handleNavigatePostList = () => {
        navigate(`/${subPath}`);
    }

    useEffect(() => {
        if (!user || !user.userId) {
            alert("로그인 후 이용가능합니다.");
            navigate("/");
            return;
        }
        
        fetchPost();
        fetchComment();    
    }, []);

    const fetchPost = async () => {
        try {
            setSkeleton(true);
            const response = await E.getEvent(postId);
            setEventData(response.data);
            
        } catch(error) {
            setNotFound(true);
        } finally {
            setSkeleton(false);
        }
    };

    const fetchComment = async () => {
        try {
            const response = await EC.getEventCommentList(postId);
            setCommentData(response.data);
            
        } catch(error) {
        }
    };

    const handleUploadComment = async () => {
        if(!comment || comment.trim() === "") {
            alert("내용을 입력해주세요!");
            return;
        }

        if(comment.length < 5) {
            alert("댓글 길이가 너무 짧습니다!\n5자 이상으로 작성해주세요.")
        }

        try {
            const formData = new FormData();
            formData.append("content", comment);
            if (file) formData.append("file", file);   

            await EC.uploadEventComment(eventData.eventId, formData);
            setComment("");
            setFile(null);
            setImagePreview(null);
            fetchComment();
        } catch(error) {

        }
    };

    const handleDeleteComment = async (eventCommentId) => {
        try {
            await EC.deleteEventComment(eventData.eventId, eventCommentId);
            fetchComment();
        } catch(error) {
            
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
        setImagePreview(null);
    };

    const handleClickFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setFile(file);
        setImagePreview(previewUrl);

        event.target.value = "";
    };
    
    if(notFound) {
        return <WrongPage type={"post"}/>;
    };

    const handleImageFullScreen = (imageUrl) => {
        setIsProfileModalOpen(true);
        setSelectImage(imageUrl);
    };

    const handleCloseModal = () => {
        setIsProfileModalOpen(false);
        setSelectImage(null);
    };

    const getTypeToKorean = (type) => {
        switch(type) {
            case "GENERAL": return "일반";
            case "FIRSTCOME": return "선착순";
            case "CONDITION": return "조건";
            case "RANDOM": return "추첨";
            case "ETC": return "기타";
        }
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
                            {isProfileModalOpen && <ImageFullScreen onClose={handleCloseModal} profile={selectImage}/>}
                            <S.Text $size={"14px"} style={{cursor: "pointer"}} onClick={handleNavigatePostList}>{boardInfo.label} &gt;</S.Text>
                            <S.HorizontalWrapper $justify={"space-between"} style={{width: "100%"}}>
                                <S.Text $size={"18px"} $weight={"700"} style={{marginTop: "1px"}}>[{getTypeToKorean(eventData.type)}] {eventData.title}</S.Text>
                                {(user?.role === "MANAGER" || user?.role === "ADMIN") && <MoreOption formData={eventData} type={subPath}/>}
                            </S.HorizontalWrapper>
                            <S.HorizontalWrapper $gap={"12px"} style={{marginTop: "10px"}}>
                                <UserProfileImage2 userId={eventData.userId} profileUrl={eventData.profileUrl} width={"35px"} height={"35px"} radius={"35px"} />
                                <S.HorizontalWrapper title="작성자">
                                    <S.Icon src={author} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"14px"} $weight={"600"} style={{cursor: "pointer"}} onClick={() => navigate(`/users/${eventData.userId}`)}>{eventData.nickname}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper title="조회수">
                                    <S.Icon src={view} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"12px"} $color={"#878787"} $weight={"600"}>{eventData.viewCnt}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper title="댓글 수">
                                    <S.Icon src={comments} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"12px"} $color={"#878787"} $weight={"600"}>{eventData.commentCnt}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper title="참여 가능 인원 수 또는 추첨 인원 수">
                                    <S.Icon src={max_user} $width={"12px"} $height={"12px"}/>
                                    <S.Text $size={"12px"} $color={"#878787"} $weight={"600"}>{eventData.maxUser > 1000000 ? "∞" : eventData.maxUser}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper title="이벤트 마감 시각">
                                    <S.Icon src={clock} $width={"12px"} $height={"12px"}/>
                                    <S.Text $size={"12px"} $color={"#878787"} $weight={"600"}>{formatDate(eventData.closedAt, 4)}</S.Text>
                                </S.HorizontalWrapper>
                                <S.Icon src={ellipse} $width={"3px"} $height={"3px"}/>
                                <S.Text $size={"12px"} $color={"#878787"} title="작성 시각">{formatDate(eventData.createdAt, 4)}</S.Text>
                            </S.HorizontalWrapper>
                        </S.VerticalWrapper>
                        <S.Contour />
                        <S.VerticalWrapper>
                        <S.Content>
                            <PostContent content={eventData.content}/>
                        </S.Content>
                        </S.VerticalWrapper>
                        <S.HorizontalWrapper $gap={"10px"} style={{marginBottom: "30px"}}>
                            <S.NavigateButton onClick={handleNavigatePostList}><S.Icon src={list} $width={"13px"} $height={"10px"}/>목록</S.NavigateButton>
                        </S.HorizontalWrapper>
                    </>
                )}
            </S.Wrapper>

            <S.CommentWrapper style={{display: eventData.useComment ? "":"none"}}>
                <S.Text $size={"17px"} $weight={"700"} style={{textAlign: "left", paddingLeft: "15px", marginBottom: "10px", marginTop: "10px"}}>댓글 ({eventData.commentCnt})</S.Text>
                <S.CommentInputArea>
                    <S.HorizontalWrapper style={{marginBottom: "5px"}}>
                        <S.InputField value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <S.CommentButton onClick={handleUploadComment} disabled={comment.length < 5 || user.role === "GUEST"}>등록</S.CommentButton>
                    </S.HorizontalWrapper>
                    <BC.HorizontalWrapper $jc={"flex-start"} $gap={"5px"} style={{width: "100%", padding: "0 20px", cursor: "pointer"}}>
                        <BC.Icon src={file ? images_select : images} $w={"15px"} onClick={() => handleClickFileUpload()}/>
                        <BC.Text $weight={"600"} $color={file ? "#1CA6FC" : "#878787"} onClick={() => handleClickFileUpload()}>이미지</BC.Text>
                        <S.FileInput type="file" accept="image/png, image/jpg, image/jpeg" ref={fileInputRef} onChange={handleImageChange}/>
                    </BC.HorizontalWrapper>
                    {imagePreview && (<BC.Image $w={"200px"} style={{alignSelf: "flex-start", padding: "0 15px"}}
                            src={imagePreview}
                            alt="preview"
                            onClick={handleRemoveImage}
                        />
                    )}
                    <S.Text $color={"#878787"} $size={"11px"}>댓글을 작성할 때는 커뮤니티 이용가이드의 댓글 작성 가이드라인을 참고해주세요.</S.Text>
                    <S.Text $color={"#878787"} $size={"11px"}>이벤트 게시판의 댓글은 1인당 하나의 댓글만 등록할 수 있습니다.</S.Text>
                </S.CommentInputArea>
                <S.CommentList>
                    {commentData?.length > 0 ? (
                        commentData.map((c) => (
                        <S.CommentItem key={c.eventCommentId}>
                            <S.HorizontalWrapper $gap={"15px"} style={{width: "100%", alignItems: "flex-start"}}>
                                <UserProfileImage2 userId={c.userId} profileUrl={c.profileUrl} width={"50px"} height={"50px"} radius={"50px"} />
                                <S.VerticalWrapper style={{height: "50%", flex: "1", justifyContent: "flex-start", gap: "5px"}}>
                                    <S.HorizontalWrapper>
                                        <S.Text $size="14px" $weight="600">{c.nickname}</S.Text>
                                        <S.Text $size="12px" $color="#878787">{formatDate(c.createdAt, 3)}</S.Text>
                                        {user.userId === c.userId && <S.Text $size={"12px"} $weight={"500"} $color={"red"} style={{cursor: "pointer"}} onClick={() => handleDeleteComment(c.eventCommentId)}>삭제</S.Text>}
                                    </S.HorizontalWrapper>
                                    {c.imageUrl && <BC.Image src={c.imageUrl} $w={"300px"} $h={"auto"} $fit={"cover"} onClick={() => handleImageFullScreen(c.imageUrl)} style={{cursor: "pointer"}}/>}
                                    <S.Text $size="13px" style={{textAlign: "left", whiteSpace: "pre-line"}}>{c.content}</S.Text>
                                </S.VerticalWrapper>
                            </S.HorizontalWrapper>
                        </S.CommentItem>
                        ))
                    ) : (
                        <S.Text $size="14px" $color="#878787">
                            아직 댓글이 없습니다...
                        </S.Text>
                    )}
                </S.CommentList>
            </S.CommentWrapper>
        </>
    );
}

export default EventPost;