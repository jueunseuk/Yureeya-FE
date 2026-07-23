import * as P from "@/apis/post";
import * as S from "./styles";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate, toJavaLocalDateTime } from "@/util/dateFormatter";
import { getEmpathyColor } from "@/util/empathySelector";

const PopularBoard = () => {
    const {subPath} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [period, setPeriod] = useState("1440");
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const sort = "empathyCnt";

    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;

    const handleClickPeriod = (value) => {
        setPeriod(value);
    }

    const handleClickPage = (pageNum) => {
        setSearchParams({ page: pageNum });
    }

    const handleNavigatePost = (boardName, id, boardId) => {
        navigate(`/${boardName}/${id}`, {
            state: {
                page: page > 0 ? page - 1 : 0, sort, boardId, boardName
            }
        });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const now = new Date();
            const newStart = new Date(now.getTime() - parseInt(period) * 60 * 1000);
        
            const start = toJavaLocalDateTime(newStart);
            const end = toJavaLocalDateTime(now);

            try {
                const response = await P.getPopularPosts({page: page > 0 ? page - 1 : 0, sort, start, end});
                setPosts(response.data.content);
                setTotalElements(response.data.totalElements);
                setTotalPage(response.data.totalPages);
            } catch(error) {
                
            }
        }
        fetchPosts();
    }, [searchParams, period, subPath]);

    const getPageComponent = () => {
        const pages = Array.from({length: Math.min(totalPage, 5)}, (_, i) => i+1);

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
                        <S.Text $size={"11px"} $weight={"700"}>{Math.min(totalElements, 100)}</S.Text>
                        <S.Text $size={"11px"}>개의 글</S.Text>
                    </S.TextArea>
                    <S.SortArea>
                        <S.Sort onClick={() => handleClickPeriod("1440")} $weight={period === "1440" ? 700 : ""}>24시간 이내</S.Sort>
                        <S.Text $size={"11px"}>|</S.Text>
                        <S.Sort onClick={() => handleClickPeriod("10080")} $weight={period === "10080" ? 700 : ""}>일주일 이내</S.Sort>
                        <S.Text $size={"11px"}>|</S.Text>
                        <S.Sort onClick={() => handleClickPeriod("40320")} $weight={period === "40320" ? 700 : ""}>한 달 이내</S.Sort>
                    </S.SortArea>
                </S.TableHeader>
                <S.Table>
                        <colgroup>
                            <col style={{ width: "150px" }} />
                            <col style={{ width: "370px" }} />
                            <col style={{ width: "80px" }} />
                            <col style={{ width: "80px" }} />
                            <col style={{ width: "80px" }} />
                            <col style={{ width: "63px" }} />
                        </colgroup>
                    <thead>
                        <S.FirstRow>
                            <S.Field>게시판</S.Field>
                            <S.Field>제목</S.Field>
                            <S.Field $align={"left"}>작성자</S.Field>
                            <S.Field>작성일</S.Field>
                            <S.Field>조회</S.Field>
                            <S.Field>추천</S.Field>
                        </S.FirstRow>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <S.Row key={post.postId}>
                                <S.Column onClick={() => navigate(`/${post.boardName}`)} style={{cursor: "pointer"}}>{post.boardKorean}</S.Column>
                                <S.Column $align={"left"} onClick={() => handleNavigatePost(post.boardName, post.postId, post.boardId)} style={{cursor: "pointer"}}>{post.title}{post.commentCnt > 0 ? (<S.Comment>{post.commentCnt}</S.Comment>) : ""}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} onClick={() => navigate(`/users/${post.userId}`)} style={{cursor: "pointer"}}>{post.userNickname}</S.Column>
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

export default PopularBoard;