import * as P from "@/apis/post";
import * as S from "./styles";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate } from "@/util/dateFormatter";
import { getEmpathyColor } from "@/util/empathySelector";

const FavoriteBoard = () => {
    const {subPath} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    
    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;
    const sort = "createdAt";

    const handleClickPage = (pageNum) => {
        setSearchParams({ page: pageNum });
    }

    const handleNavigatePost = (id) => {
        navigate(`/${subPath}/${id}`, {
            state: {
                page: page > 0 ? page - 1 : 0, sort, boardId, boardName: subPath
            }
        });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await P.getBoardPosts({page: page > 0 ? page - 1 : 0, sort, boardId});
                setPosts(response.data.content);
                setTotalElements(response.data.totalElements);
                setTotalPage(response.data.totalPages);
            } catch(error) {
                
            }
        }
        fetchPosts();
    }, [searchParams, subPath]);

    const getPageComponent = () => {
        const pages = Array.from({length: totalPage}, (_, i) => i+1);

        return (
            <>
                {pages.map((pageNum) => (
                        <S.PageButton $weight={page === pageNum ? "700" : "400"} $border={page === pageNum ? "1px" : "0px"} key={pageNum} onClick={() => handleClickPage(pageNum)}>
                            {pageNum}
                        </S.PageButton>
                ))}
            </>
        )
    };

    return (
        <>
            <S.Wrapper>
                <S.Title>{boardInfo.label}</S.Title>
                <S.Description>{boardInfo.description}</S.Description>
                <S.TableHeader>
                    <S.TextArea>
                        <S.Text $size={"11px"} $weight={"700"}>{totalElements}</S.Text>
                        <S.Text $size={"11px"}>개의 글</S.Text>
                    </S.TextArea>
                </S.TableHeader>
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
                        {posts.map((post, idx) => (
                            <S.Row key={post.postId}>
                                <S.Column>{totalElements - ((page - 1) * (20) + idx)}</S.Column>
                                <S.Column $align={"left"} onClick={() => handleNavigatePost(post.postId)} style={{cursor: "pointer"}}>{post.title}{post.commentCnt > 0 ? (<S.Comment>{post.commentCnt}</S.Comment>) : ""}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} style={{cursor: "pointer"}} onClick={() => navigate(`/users/${post.userId}`)}>{post.userNickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(post.createdAt, 3)}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{post.viewCnt}</S.Column>
                                <S.Column $color={getEmpathyColor(post.empathyCnt)}>{post.empathyCnt}</S.Column>
                            </S.Row>
                        ))}
                    </tbody>
                </S.Table>
                <S.PaginationArea>
                    {getPageComponent()}
                </S.PaginationArea>
            </S.Wrapper>
        </>
    )
}

export default FavoriteBoard;