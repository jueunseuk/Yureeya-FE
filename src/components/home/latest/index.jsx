import * as P from "@/apis/post";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/util/dateFormatter";
import { SkeletonItem } from "@/common/skeleton/Skeleton";

const LatestPost = () => {
    const page = 0;
    const sort = "createdAt";
    const [posts, setPosts] = useState([]);
    const [skeleton, setSkeleton] = useState(true);
    const navigate = useNavigate();

    const handleNavigatePost = (boardName, id, boardId) => {
        navigate(`/${boardName}/${id}`, {
            state: {
                page, sort, boardId, boardName
            }
        });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setSkeleton(true);
                const response = await P.getAllPosts({page, sort});
                setPosts(response.data.content);

            } catch(error) {
                
            } finally {
                setSkeleton(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <>
            <S.Wrapper>
                <S.TitleArea>
                    <S.Text $size={"16px"} $weight={"600"}>최신글</S.Text>
                    <S.Text $size={"12px"} style={{cursor: "pointer"}} onClick={() => navigate("/new")}>더보기</S.Text>
                </S.TitleArea>
                    <S.Table>
                        <colgroup>
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "51%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "10%" }} />
                        </colgroup>
                        <tbody>
                            {skeleton ?
                                Array.from({ length: 15 }).map((_, index) => (
                                    <S.Row key={index}>
                                        <S.FirstColumn><SkeletonItem $width="100%" $height="15px" $radius={"5px"} /></S.FirstColumn>
                                        <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"} /></S.Column>
                                        <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"} /></S.Column>
                                        <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"} /></S.Column>
                                        <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"} /></S.Column>
                                    </S.Row>
                                ))
                                : posts.slice(0, 15).map((post) => (
                                <S.Row key={post.postId}>
                                    <S.FirstColumn><S.Text onClick={() => navigate(`/${post.boardName}`)} style={{cursor: "pointer"}}>[{post.boardKorean}]</S.Text></S.FirstColumn>
                                    <S.Column $align={"left"} onClick={() => handleNavigatePost(post.boardName, post.postId, post.boardId)}><S.Text style={{cursor: "pointer"}}>{post.title}{post.commentCnt > 0 ? (<S.Comment>{post.commentCnt}</S.Comment>) : ""}</S.Text></S.Column>
                                    <S.Column $align={"left"}><S.Text onClick={() => navigate(`/users/${post.userId}`)} style={{cursor: "pointer"}}>{post.userNickname}</S.Text></S.Column>
                                    <S.Column><S.Text $color={"#878787"}>{formatDate(post.createdAt, 3)}</S.Text></S.Column>
                                    <S.Column><S.Text $color={"#878787"}>{post.viewCnt}</S.Text></S.Column>
                                </S.Row>
                            ))}
                        </tbody>
                    </S.Table>
            </S.Wrapper>
        </>
    )
}

export default LatestPost;