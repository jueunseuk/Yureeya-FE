import * as S from "./styles";
import * as E from "@/apis/event";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate } from "@/util/dateFormatter";

const EventBoard = () => {
    const {subPath} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [eventData, setEventData] = useState([]);
    const navigate = useNavigate();
    
    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;
    const size = 20;
    const sort = "createdAt";
    const direction = "DESC";
    const [type, setType] = useState(null);
    const [status, setStatus] = useState(null);

    const handleClickPage = (pageNum) => {
        setSearchParams({ page: pageNum });
    };

    const handleNavigatePost = (id) => {
        navigate(`/${subPath}/${id}`);
    };

    const fetchPosts = async () => {
        try {
            const form = {
                page: page > 0 ? page - 1 : 0,
                "size": size,
                "sort": sort,
                "direction": direction,
                type, status
            }
            const response = await E.getEventList(form);
            setEventData(response.data.content);
            setTotalElements(response.data.totalElements);
            setTotalPage(response.data.totalPages);
        } catch(error) {
            
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [searchParams, subPath, type, status]);

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

    const getTypeToKorean = (type) => {
        switch(type) {
            case "GENERAL": return "일반";
            case "FIRSTCOME": return "선착순";
            case "CONDITION": return "조건";
            case "RANDOM": return "추첨";
            case "ETC": return "기타";
        }
    };

    const getStatusAttribute = (status) => {
        switch (status) {
            case "PENDING":
                return { name: "예정", color: "#1CA6FC" };
            case "ACTIVE":
                return { name: "진행", color: "#26C281" };
            case "CLOSED":
                return { name: "종료", color: "#878787" };
        }
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
                            <col style={{ width: "7%" }} />
                            <col style={{ width: "13%" }} />
                            <col style={{ width: "40%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} />
                        </colgroup>
                    <thead>
                        <S.FirstRow>
                            <S.Field>번호</S.Field>
                            <S.Field>유형</S.Field>
                            <S.Field>제목</S.Field>
                            <S.Field>이벤트 마감</S.Field>
                            <S.Field>작성자</S.Field>
                            <S.Field>작성일</S.Field>
                            <S.Field>상태</S.Field>
                        </S.FirstRow>
                    </thead>
                    <tbody>
                        {eventData.map((event, idx) => (
                            <S.Row key={event.eventId}>
                                <S.Column>{event.eventId}</S.Column>
                                <S.Column>[ {getTypeToKorean(event.type)} ]</S.Column>
                                <S.Column $align={"left"} onClick={() => handleNavigatePost(event.eventId)} style={{cursor: "pointer"}}>{event.title}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(event.closedAt, 1)}</S.Column>
                                <S.Column $size={"12px"} style={{cursor: "pointer"}} onClick={() => navigate(`/users/${event.userId}`)}>{event.nickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(event.createdAt, 3)}</S.Column>
                                <S.Column $color={getStatusAttribute(event.status).color} $size={"12px"} style={{fontWeight: "600"}}>{getStatusAttribute(event.status).name}</S.Column>
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

export default EventBoard;