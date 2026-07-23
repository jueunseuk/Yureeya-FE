import * as A from "@/apis/apply";
import * as S from "./styles";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate } from "@/util/dateFormatter";
import ApplyUpload from "@/components/modal/applyUpload";
import ApplyConfirm from "@/components/modal/applyConfirm";
import useUserInfo from "@/hooks/localStorage";

const ApplyBoard = () => {
    const user = useUserInfo();
    const {subPath} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [applyData, setApplyData] = useState([]);
    const [openApplyConfirmModal, setOpenApplyConfirmModal] = useState(false);
    const [openApplyUploadModal, setOpenApplyUploadModal] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [selectItem, setSelectItem] = useState();
    
    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;
    const size = 20;
    const sort = "createdAt";
    const direction = "DESC";

    const handleClickPage = (pageNum) => {
        setSearchParams({ page: pageNum });
    }

    const fetchApplies = async () => {
        try {
            const response = await A.getApplyList({page: page > 0 ? page - 1 : 0, sort, direction, confirm: confirm});
            setApplyData(response.data.content);
            setTotalElements(response.data.totalElements);
            setTotalPage(response.data.totalPages);
        } catch(error) {
            
        }
    }

    useEffect(() => {
        fetchApplies();
    }, [searchParams, subPath, page, sort, size, direction, confirm]);

    const handleCloseModal = () => {
        setOpenApplyConfirmModal(false);
        setOpenApplyUploadModal(false);
        fetchApplies();
    };

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

    const getConfirmAttribute = (confirm) => {
        if(confirm) {
            return {"color": "white", "bg": "#4AC5F3"};
        } else {
            return {"color": "white", "bg": "#4b4b4b"};
        }
    };

    const handleSelectConfirmStatus = (selected) => {
        setConfirm(selected);
    };

    const getPreferenceRole = (role) => {
        switch(role) {
            case "BOARD": return "게시판 관리";
            case "GALLERY": return "갤러리 관리";
            case "EVENT": return "이벤트 괸리";
            case "POLL": return "투표 관리";
            case "CALENDAR": return "캘린더 관리";
            case "COMPLAINT": return "신고 관리";
            case "QUIZ": return "퀴즈 관리";
            case "ETC": return "기타 관리";
            case "NONE": return "선호 없음";
        }
    };

    const getBoxStyle = (currentStatus, color) => ({
        backgroundColor: confirm  === currentStatus? color : "white",
        border: `2px solid ${color}`,
        cursor: "pointer"
    });

    const handleOpenConfirmModal = (apply) => {
        if(user.role === "MEMBER" || user.role === "GUEST") {
            alert("신청서를 볼 권한이 부족합니다.");
            return;
        }
        setOpenApplyConfirmModal(true); 
        setSelectItem(apply);
    };

    return (
        <>
            <S.Wrapper>
                {openApplyUploadModal && <ApplyUpload onClose={handleCloseModal} />}
                {openApplyConfirmModal && <ApplyConfirm onClose={handleCloseModal} applyId={selectItem.applyId} />}
                <S.Title>{boardInfo.label}</S.Title>
                <S.Description>{boardInfo.description}</S.Description>
                <S.UploadButton onClick={() => setOpenApplyUploadModal(true)}>
                    신청하기
                </S.UploadButton>
                <S.TableHeader>
                    <S.TextArea>
                        <S.Text $size={"11px"} $weight={"700"}>{totalElements}</S.Text>
                        <S.Text $size={"11px"}>개의 글</S.Text>
                    </S.TextArea>
                    <S.HorizontalWrapper $ai={"center"} $gap={"10px"} style={{cursor: "default"}}>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectConfirmStatus(null)}>
                            <S.Text $size={"12px"} $weight={"600"}>ALL</S.Text>
                            <S.CheckBox style={getBoxStyle(null, "#000000")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectConfirmStatus(false)}>
                            <S.Text $size={"12px"} $weight={"600"}>WAIT</S.Text>
                            <S.CheckBox style={getBoxStyle(false, "#4b4b4b")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectConfirmStatus(true)}>
                            <S.Text $size={"12px"} $weight={"600"}>CONFIRM</S.Text>
                            <S.CheckBox style={getBoxStyle(true, "#4AC5F3")} />
                        </S.HorizontalWrapper>
                    </S.HorizontalWrapper>
                </S.TableHeader>
                <S.Table>
                        <colgroup>
                            <col style={{ width: "70px" }} />
                            <col style={{ width: "350px" }} />
                            <col style={{ width: "90px" }} />
                            <col style={{ width: "90px" }} />
                            <col style={{ width: "110px" }} />
                            <col style={{ width: "110px" }} />
                        </colgroup>
                    <thead>
                        <S.FirstRow>
                            <S.Field>번호</S.Field>
                            <S.Field>제목</S.Field>
                            <S.Field $align={"left"}>작성자</S.Field>
                            <S.Field>작성일</S.Field>
                            <S.Field>선호하는 역할</S.Field>
                            <S.Field>확인</S.Field>
                        </S.FirstRow>
                    </thead>
                    <tbody>
                        {applyData.map((apply, idx) => (
                            <S.Row key={apply.applyId}>
                                <S.Column>{totalElements - ((page - 1) * (size) + idx)}</S.Column>
                                <S.Column $align={"left"} style={{cursor: "pointer"}} onClick={() => handleOpenConfirmModal(apply)}>{apply.title}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} onClick={() => navigate(`/users/${apply.userId}`)} style={{cursor: "pointer"}}>{apply.nickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(apply.createdAt, 3)}</S.Column>
                                <S.Column $size={"12px"}>{getPreferenceRole(apply.preferenceRole)}</S.Column>
                                <S.Column style={{padding: "0px 16px"}}>
                                    <S.Text $color={"white"} $size={"12px"} $weight={"700"}style={{backgroundColor:getConfirmAttribute(apply.confirm).bg, borderRadius: "5px", padding: "3px 0px"}}>
                                        {apply.confirm ? "CONFIRM" : "WAIT"}
                                    </S.Text>
                                </S.Column>
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

export default ApplyBoard;