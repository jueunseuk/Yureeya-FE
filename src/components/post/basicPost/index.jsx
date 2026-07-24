import * as P from "@/apis/post";
import * as C from "@/apis/comment"
import * as E from "@/apis/empathy";
import * as U from "@/apis/user";
import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import useUserInfo from "@/hooks/localStorage";
import MoreOption from "@/components/modal/moreOption";
import author from "@/assets/icon/post/author.svg";
import empathy from "@/assets/icon/post/empathy.svg";
import view from "@/assets/icon/post/view.svg";
import comments from "@/assets/icon/post/comment.svg";
import ellipse from "@/assets/icon/post/ellipse.svg";
import emoticon from "@/assets/icon/chat/emoticon.svg";
import emoticon_select from "@/assets/icon/chat/emoticon_select.svg";
import fixed from "@/assets/icon/post/fixed.svg";
import list from "@/assets/icon/gallery/list.svg";
import WrongPage from "@/pages/wrong/WrongPage";
import MoreOptionComment from "@/components/modal/moreOptionComment";
import { formatDate } from "@/util/dateFormatter";
import { PostContent } from "../postContent";
import { SkeletonItem } from "@/common/skeleton/Skeleton";
import { getEmpathyColor } from "@/util/empathySelector";
import { UserProfileImage2 } from "@/common/func/UserProfile2";

const BasicPost = () => {
    const user = useUserInfo();
    const location = useLocation().pathname.split("/")[1];
    const navigate = useNavigate();
    const { state } = useLocation();
    const {subPath} = useParams();
    const boardInfo = BOARD_BY_PATH[subPath];
    const {postId} = useParams();
    const [alreadyEmpathy, setAlreadyEmpathy] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [skeleton, setSkeleton] = useState(true);
    const [postData, setPostData] = useState({});
    const [recommendPostData, setRecommentPostData] = useState([]);
    const [empathyCnt, setEmpathyCnt] = useState(0);
    const [comment, setComment] = useState("");
    const [selectEmoticon, setSelectEmoticon] = useState(null);
    const [locked, setLocked] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const [fixedCommentData, setFixedCommentData] = useState([]);
    const [emoticonData, setEmoticonData] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [editingLocked, setEditingLocked] = useState(false);
    const [openEmoticonModal, setOpenEmoticonModal] = useState(false);

    const handleNavigatePostList = () => {
        navigate(`/${subPath}`);
    };

    const fetchPost = async () => {
        try {
            setSkeleton(true);
            const response = await P.getPost(postId);
            setPostData(response.data);
            setAlreadyEmpathy(response.data.alreadyEmpathy);
            setEmpathyCnt(response.data.empathyCnt);
        } catch(error) {
            if(error.response.data.code === "POST_001") {
                setNotFound(true);
            }
        } finally {
            setSkeleton(false);
        }
    };

    const fetchRecommendPost = async () => {
        try {
            const form = {
                page: state.page || 0,
                sort: "createdAt",
                size: 20,
                direction: "DESC",
                boardId: state.boardId
            };
            
            const response = await P.getBoardPosts(form);
            setRecommentPostData(response.data.content);
        } catch(error) {
            if(error.response.data.code === "POST_001") {
                setNotFound(true);
            }
        } finally {
            setSkeleton(false);
        }
    };

    const fetchComment = async () => {
        try {
            const fixed = false;
            const response = await C.getPostCommentList(postId, fixed);
            setCommentData(response);
            
        } catch(error) {
            if(error.response.data.code === "POST_001") {
                setNotFound(true);
            }
        }
    };

    const fetchFixedComment = async () => {
        try {
            const response = await C.getPostCommentList(postId, true);
            setFixedCommentData(response);
            
        } catch(error) {
            if(error.response.data.code === "POST_001") {
                setNotFound(true);
            }
        }
    };

    const fetchUserEmoticon = async () => {
        try {
            const response = await U.getUserEmoticon();
            setEmoticonData(response.data);
        } catch(error) {

        }
    };

    useEffect(() => {
        if (!user || !user.userId) {
            alert("로그인 후 이용가능합니다.");
            navigate("/");
            return;
        }

        fetchPost();
        fetchComment();
        fetchFixedComment();
        fetchUserEmoticon();
        fetchRecommendPost();
    }, []);
    
    const handleClickComment = async () => {
        if(!comment || comment.trim() === "") {
            alert("내용을 입력해주세요!");
            return;
        }

        if(comment.length < 5) {
            alert("댓글 길이가 너무 짧습니다!\n5자 이상으로 작성해주세요.")
        }

        try {
            await C.postComment({postId, comment, locked, shopItemId: selectEmoticon});
            setComment("");
            setOpenEmoticonModal(false);
            setSelectEmoticon(null);
            fetchComment();
        } catch(error) {

        }
    };

    const handleClickUpdateComment = async (commentId) => {
        try {
            const form = {
                postId: postId,
                comment: editingContent,
                locked: editingLocked
            };
            await C.patchComment(form, commentId);
            alert("댓글 수정 완료!");
            setEditingCommentId(null);

            fetchComment();
        } catch(error) {

        }
    };

    const handleClickEmpathy = async (postId) => {
        if (isDisabled) return;
        setIsDisabled(true);

        try {
            if(!alreadyEmpathy) {
                setAlreadyEmpathy(true);
                setEmpathyCnt(empathyCnt+1);
                await E.postEmpathy(postId);
            } else {
                setAlreadyEmpathy(false);
                setEmpathyCnt(empathyCnt-1);
                await E.deleteEmpathy(postId);
            }
        } catch(error) {

        } finally {
            setTimeout(() => {
                setIsDisabled(false);
            }, 3000);
        }
    };

    if(notFound) {
        return <WrongPage type={"post"} />;
    };

    const handleNavigatePost = (id) => {
        navigate(`/${subPath}/${id}`, {
            state: {
                page: state.page, sort: state.sort, boardId: state.boardId, boardName: state.boardName
            }
        });
        window.location.reload();
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
                                <S.Text $size={"18px"} $weight={"700"} style={{marginTop: "1px"}}>{postData.title}</S.Text>
                                <MoreOption formData={postData} type={subPath}/>
                            </S.HorizontalWrapper>
                            <S.HorizontalWrapper $gap={"12px"} style={{marginTop: "10px"}}>
                                <UserProfileImage2 userId={postData.userId} profileUrl={postData.profileImageUrl} width={"35px"} height={"35px"} radius={"35px"} />
                                <S.HorizontalWrapper>
                                    <S.Icon src={author} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"14px"} $weight={"600"} style={{cursor: "pointer"}} onClick={() => navigate(`/users/${postData.userId}`)}>{postData.userNickname}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper>
                                    <S.Icon src={empathy} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"12px"}>{postData.empathyCnt}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper>
                                    <S.Icon src={view} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"12px"} $color={"#878787"} $weight={"600"}>{postData.viewCnt}</S.Text>
                                </S.HorizontalWrapper>
                                <S.HorizontalWrapper>
                                    <S.Icon src={comments} $width={"10px"} $height={"10px"}/>
                                    <S.Text $size={"12px"} $color={"#878787"} $weight={"600"}>{postData.commentCnt}</S.Text>
                                </S.HorizontalWrapper>
                                <S.Icon src={ellipse} $width={"3px"} $height={"3px"}/>
                                <S.Text $size={"12px"} $color={"#878787"}>{formatDate(postData.createdAt, 4)}</S.Text>
                            </S.HorizontalWrapper>
                        </S.VerticalWrapper>
                        <S.Contour />
                        <S.VerticalWrapper>
                        <S.Content>
                            <PostContent content={postData.content}/>
                        </S.Content>
                        </S.VerticalWrapper>
                        <S.HorizontalWrapper $gap={"10px"} style={{marginBottom: "30px"}}>
                            <S.NavigateButton onClick={handleNavigatePostList}><S.Icon src={list} $width={"13px"} $height={"10px"}/>목록</S.NavigateButton>
                            <S.EmpathyButton disabled={isDisabled} $bg={alreadyEmpathy ? "#C6BC73" : "#e2e2e2"} onClick={() => handleClickEmpathy(postId)}><S.Icon src={empathy} $width={"13px"} $height={"10px"}/>{empathyCnt}</S.EmpathyButton>
                        </S.HorizontalWrapper>
                    </>
                )}
            </S.Wrapper>

            <S.CommentWrapper>
                <S.Text $size={"17px"} $weight={"700"} style={{textAlign: "left", paddingLeft: "15px", marginBottom: "10px", marginTop: "10px"}}>댓글 ({postData.commentCnt})</S.Text>
                <S.CommentInputArea>
                    <S.HorizontalWrapper style={{marginBottom: "5px"}}>
                        <S.InputField value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <S.CommentButton onClick={handleClickComment} disabled={comment.length < 5 || user.role === "GUEST"}>등록</S.CommentButton>
                    </S.HorizontalWrapper>
                    <BC.HorizontalWrapper $jc={"flex-start"} $gap={"5px"} style={{width: "100%", padding: "0 20px", cursor: "pointer"}} onClick={() => {setOpenEmoticonModal(!openEmoticonModal); setSelectEmoticon(null)}}>
                        <BC.Icon src={openEmoticonModal ? emoticon_select : emoticon} />
                        <BC.Text $weight={"600"} $color={openEmoticonModal ? "#1CA6FC" : "#878787"}>이모티콘</BC.Text>
                    </BC.HorizontalWrapper>
                    <BC.HorizontalWrapper $jc={"flex-start"} style={{width: "100%", padding: "10px 20px"}}>
                        {openEmoticonModal && <BC.HorizontalWrapper $jc={"flex-start"} $gap={"5px"} style={{width: "100%", flexWrap: "wrap"}}>
                            {emoticonData && emoticonData.length > 0 ?
                            <>{emoticonData.map((emoticon) => (
                                <BC.Image src={emoticon.imageUrl} $w={"80px"} style={{cursor: "pointer", boxShadow: selectEmoticon === emoticon.shopItemId ? "0 0 8px rgba(0, 0, 0, 0.3)" : ""}} onClick={() => setSelectEmoticon(emoticon.shopItemId)} title={emoticon.name}/>
                            ))}</>
                            :
                            <BC.EmptyBox>보유한 이모티콘이 없습니다..</BC.EmptyBox>
                            }
                        </BC.HorizontalWrapper>
                        }
                    </BC.HorizontalWrapper>
                    <S.Text $color={"#878787"} $size={"11px"}>댓글을 작성할 때는 커뮤니티 이용가이드의 댓글 작성 가이드라인을 참고해주세요.</S.Text>
                </S.CommentInputArea>
                <S.CommentList>
                    {fixedCommentData?.length > 0 && (
                        fixedCommentData.map((c) => (
                        <S.CommentItem key={c.commentId}>
                            <S.HorizontalWrapper $gap={"15px"} style={{width: "100%", alignItems: "flex-start"}}>
                                <UserProfileImage2 userId={c.userId} profileUrl={c.profileUrl} width={"50px"} height={"50px"} radius={"50px"} />
                                <S.VerticalWrapper style={{height: "50%", flex: "1", justifyContent: "flex-start", gap: "5px"}}>
                                    <S.HorizontalWrapper>
                                        {c.userId === postData.userId && <S.Icon src={author}/>}
                                        <S.Text $size="14px" $weight="600">{c.userName}</S.Text>
                                        <S.Text $size="12px" $color="#878787">{formatDate(c.createdAt, 3)}</S.Text>
                                        {c.fixed && <BC.Icon src={fixed} $h={"12px"} />}
                                    </S.HorizontalWrapper>
                                    {c.emoticonUrl && <BC.Image src={c.emoticonUrl} $w={"100px"} />}
                                    <S.Text $size="13px" style={{textAlign: "left", whiteSpace: "pre-line"}}>{c.content}</S.Text>
                                    {editingCommentId === c.commentId && (
                                        <S.VerticalWrapper style={{width: "100px", gap: "5px"}}>
                                            <S.InputField style={{minHeight: "100px", width: "700px"}} value={editingContent} onChange={(e) => setEditingContent(e.target.value)}/>
                                            <S.HorizontalWrapper style={{width: "700px", display: "flex", justifyContent: "flex-end", gap: "5px"}}>
                                                <S.Button $bg={"#C6BC73"} onClick={(() => handleClickUpdateComment(c.commentId))}>수정</S.Button>
                                                <S.Button $bg={"#e2e2e2ff"} onClick={() => setEditingCommentId(null)}>취소</S.Button>
                                            </S.HorizontalWrapper>
                                        </S.VerticalWrapper>
                                    )}
                                </S.VerticalWrapper>
                                <MoreOptionComment formData={c} postData={postData} fetchComment={fetchComment} onEdit={() => {
                                    setEditingCommentId(c.commentId);
                                    setEditingContent(c.content)}}/>
                            </S.HorizontalWrapper>
                        </S.CommentItem>
                        ))
                    )}
                    {commentData?.length > 0 ? (
                        commentData.map((c) => (
                        <S.CommentItem key={c.commentId}>
                            <S.HorizontalWrapper $gap={"15px"} style={{width: "100%", alignItems: "flex-start"}}>
                                <UserProfileImage2 userId={c.userId} profileUrl={c.profileUrl} width={"50px"} height={"50px"} radius={"50px"} />
                                <S.VerticalWrapper style={{height: "50%", flex: "1", justifyContent: "flex-start", gap: "5px"}}>
                                    <S.HorizontalWrapper>
                                        {c.userId === postData.userId && <S.Icon src={author}/>}
                                        <S.Text $size="14px" $weight="600">{c.userName}</S.Text>
                                        <S.Text $size="12px" $color="#878787">{formatDate(c.createdAt, 3)}</S.Text>
                                        {c.fixed && <BC.Icon src={fixed} $h={"12px"} />}
                                    </S.HorizontalWrapper>
                                    {c.emoticonUrl && <BC.Image src={c.emoticonUrl} $w={"120px"} />}
                                    <S.Text $size="13px" style={{textAlign: "left", whiteSpace: "pre-line"}}>{c.content}</S.Text>
                                    {editingCommentId === c.commentId && (
                                        <S.VerticalWrapper style={{width: "100px", gap: "5px"}}>
                                            <S.InputField style={{minHeight: "100px", width: "700px"}} value={editingContent} onChange={(e) => setEditingContent(e.target.value)}/>
                                            <S.HorizontalWrapper style={{width: "700px", display: "flex", justifyContent: "flex-end", gap: "5px"}}>
                                                <S.Button $bg={"#C6BC73"} onClick={(() => handleClickUpdateComment(c.commentId))}>수정</S.Button>
                                                <S.Button $bg={"#e2e2e2ff"} onClick={() => setEditingCommentId(null)}>취소</S.Button>
                                            </S.HorizontalWrapper>
                                        </S.VerticalWrapper>
                                    )}
                                </S.VerticalWrapper>
                                <MoreOptionComment formData={c} postData={postData} fetchComment={fetchComment} fetchFixedComment={fetchFixedComment} onEdit={() => {
                                    setEditingCommentId(c.commentId);
                                    setEditingContent(c.content)}}/>
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

            <BC.VerticalWrapper $ai={"flex-start"}>
                <BC.Text $size={"15px"} $weight={"600"}><BC.Text $size={"15px"} $weight={"600"} $color={"#C6BC73"} style={{display: "inline"}}>{boardInfo.label}</BC.Text>의 다른 글</BC.Text>
                <S.Table>
                    <colgroup>
                        <col style={{ width: "80px" }} />
                        <col style={{ width: "400px" }} />
                        <col style={{ width: "90px" }} />
                        <col style={{ width: "90px" }} />
                        <col style={{ width: "90px" }} />
                        <col style={{ width: "73px" }} />
                    </colgroup>
                    <thead>
                        <S.FirstRow>
                            <S.Field>번호</S.Field>
                            <S.Field>제목</S.Field>
                            <S.Field $align={"left"}>작성자</S.Field>
                            <S.Field>작성일</S.Field>
                            <S.Field>조회</S.Field>
                            <S.Field>추천</S.Field>
                        </S.FirstRow>
                    </thead>
                    <tbody>
                        {recommendPostData.map((post) => (
                            <S.Row key={post.postId} $bg={postData.postId === post.postId ? "#F4F3E9" : ""} >
                                <S.Column>{post.postId}</S.Column>
                                <S.Column $align={"left"} onClick={() => handleNavigatePost(post.postId)} style={{cursor: "pointer"}}>{post.title}{post.commentCnt > 0 ? (<S.Comment>{post.commentCnt}</S.Comment>) : ""}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} style={{cursor: "pointer"}} onClick={() => navigate(`/users/${post.userId}`)}>{post.userNickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(post.createdAt, 3)}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{post.viewCnt}</S.Column>
                                <S.Column $color={getEmpathyColor(post.empathyCnt)}>{post.empathyCnt}</S.Column>
                            </S.Row>
                        ))}
                    </tbody>
                </S.Table>
            </BC.VerticalWrapper>
        </>
    );
}

export default BasicPost;