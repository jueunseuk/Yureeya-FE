import * as A from "@/apis/announcement";
import * as S from "./styles";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate } from "@/util/dateFormatter";

const AnnouncementBoard = () => {
    const {subPath} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [fixedData, setFixedData] = useState([]);
    const [announcementData, setAnnouncementData] = useState([]);
    const navigate = useNavigate();
    
    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;
    const size = 20;
    const sort = "createdAt";
    const direction = "DESC";

    const handleClickPage = (pageNum) => {
        setSearchParams({ page: pageNum });
    }

    const handleNavigatePost = (id) => {
        navigate(`/${subPath}/${id}`);
    }

    const fetchPosts = async () => {
        try {
            const form = {
                page: page > 0 ? page - 1 : 0,
                "size": size,
                "sort": sort,
                "direction": direction
            }
            const response = await A.getAnnouncementList(form);
            setAnnouncementData(response.data.content);
            setTotalElements(response.data.totalElements);
            setTotalPage(response.data.totalPages);
        } catch(error) {
            
        }
    };

    const fetchFixedPosts = async () => {
        try {
            const response = await A.getFixedAnnouncementList();
            setFixedData(response.data);
        } catch(error) {

        }
    }

    useEffect(() => {
        fetchFixedPosts();
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
                            <col style={{ width: "70px" }} />
                            <col style={{ width: "110px" }} />
                            <col style={{ width: "360px" }} />
                            <col style={{ width: "103px" }} />
                            <col style={{ width: "90px" }} />
                            <col style={{ width: "90px" }} />
                        </colgroup>
                    <thead>
                        <S.FirstRow>
                            <S.Field>번호</S.Field>
                            <S.Field>유형</S.Field>
                            <S.Field>제목</S.Field>
                            <S.Field $align={"left"}>작성자</S.Field>
                            <S.Field>작성일</S.Field>
                            <S.Field>조회수</S.Field>
                        </S.FirstRow>
                    </thead>
                    <tbody>
                        {fixedData.map((announcement, idx) => (
                            <S.Row key={announcement.announcementId} $fixed={true}>
                                <S.Column>{announcement.announcementId}</S.Column>
                                <S.Column>[ {announcement.name} ]</S.Column>
                                <S.Column $align={"left"} onClick={() => handleNavigatePost(announcement.announcementId)} style={{cursor: "pointer"}}>{announcement.title}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} style={{cursor: "pointer"}}>{announcement.nickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(announcement.createdAt, 3)}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{announcement.viewCnt}</S.Column>
                            </S.Row>
                        ))}
                        {announcementData.map((announcement, idx) => (
                            <S.Row key={announcement.announcementId}>
                                <S.Column>{announcement.announcementId}</S.Column>
                                <S.Column>[ {announcement.name} ]</S.Column>
                                <S.Column $align={"left"} onClick={() => handleNavigatePost(announcement.announcementId)} style={{cursor: "pointer"}}>{announcement.title}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} style={{cursor: "pointer"}}>{announcement.nickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(announcement.createdAt, 3)}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{announcement.viewCnt}</S.Column>
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

export default AnnouncementBoard;