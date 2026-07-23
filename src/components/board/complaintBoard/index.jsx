import * as C from "@/apis/complaint";
import * as S from "./styles";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate } from "@/util/dateFormatter";
import useUserInfo from "@/hooks/localStorage";
import ComplaintProcess from "@/components/modal/complaintProcess";
import ComplaintUpload from "@/components/modal/complaintUpload";

const ComplaintBoard = () => {
    const user = useUserInfo();
    const {subPath} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [complaintData, setComplaintData] = useState([]);
    const navigate = useNavigate();
    const [selectItem, setSelectItem] = useState();
    const [openComplaintProcessModal, setOpenComplaintProcessModal] = useState(false);
    const [openComplaintUploadModal, setOpenComplaintUploadModal] = useState(false);
    const [status, setStatus] = useState("ALL");
    
    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;
    const sort = "createdAt";
    const size = 100;
    const direction = "DESC";

    const handleClickPage = (pageNum) => {
        setSearchParams({ page: pageNum });
    };

    const handleCloseModal = () => {
        setOpenComplaintProcessModal(false);
        setOpenComplaintUploadModal(false);
        fetchComplaints();
    };

    const handleOpenComplaintProcessModal = (complaint) => {
        if(user.role === "ADMIN" || user.role === "MANAGER" || complaint.userId === user.userId) {
            setOpenComplaintProcessModal(true);
        } else {
            alert("관리자 또는 운영자만 확인할 수 있습니다.");
            return;
        }
    };

    const fetchComplaints = async () => {
        try {
            const response = await C.getComplaintList({page: page > 0 ? page - 1 : 0, sort, direction, status});
            setComplaintData(response.data.content);
            setTotalElements(response.data.totalElements);
            setTotalPage(response.data.totalPages);
        } catch(error) {
            
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [searchParams, subPath, page, sort, size, direction, status]);

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
    
    const getStatusAttribute = (status) => {
        if(status === "ACCEPT") {
            return {"color": "white", "bg": "#4AC5F3"};
        } else if(status === "WAIT") {
            return {"color": "white", "bg": "#4b4b4b"};
        } else if(status === "REJECT") {
            return {"color": "white", "bg": "#f34a4a"};
        }
    };

    const handleSelectStatus = (selected) => {
        setStatus(selected);
    };

    const getBoxStyle = (currentStatus, color) => ({
        backgroundColor: status === currentStatus ? color : "white",
        border: `2px solid ${color}`,
        cursor: "pointer"
    });

    return (
        <>
            <S.Wrapper>
                {openComplaintUploadModal && <ComplaintUpload onClose={handleCloseModal} />}
                {openComplaintProcessModal && <ComplaintProcess onClose={handleCloseModal} complaintId={selectItem.complaintId} />}
                <S.Title>{boardInfo.label}</S.Title>
                <S.Description>{boardInfo.description}</S.Description>
                <S.UploadButton onClick={() => setOpenComplaintUploadModal(true)}>
                    신고하기
                </S.UploadButton>
                <S.TableHeader>
                    <S.TextArea>
                        <S.Text $size={"11px"} $weight={"700"}>{totalElements}</S.Text>
                        <S.Text $size={"11px"}>개의 글</S.Text>
                    </S.TextArea>
                    <S.HorizontalWrapper $ai={"center"} $gap={"10px"} style={{cursor: "default"}}>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("ALL")}>
                            <S.Text $size={"12px"} $weight={"600"}>ALL</S.Text>
                            <S.CheckBox style={getBoxStyle("ALL", "#000000")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("WAIT")}>
                            <S.Text $size={"12px"} $weight={"600"}>WAIT</S.Text>
                            <S.CheckBox style={getBoxStyle("WAIT", "#4b4b4b")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("ACCEPT")}>
                            <S.Text $size={"12px"} $weight={"600"}>ACCEPT</S.Text>
                            <S.CheckBox style={getBoxStyle("ACCEPT", "#4AC5F3")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("REJECT")}>
                            <S.Text $size={"12px"} $weight={"600"}>REJECT</S.Text>
                            <S.CheckBox style={getBoxStyle("REJECT", "#f34a4a")} />
                        </S.HorizontalWrapper>
                    </S.HorizontalWrapper>
                </S.TableHeader>
                <S.Table>
                        <colgroup>
                            <col style={{ width: "6%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "50%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "12%" }} />
                        </colgroup>
                    <thead>
                        <S.FirstRow>
                            <S.Field>번호</S.Field>
                            <S.Field>유형</S.Field>
                            <S.Field>제목</S.Field>
                            <S.Field $align={"left"}>작성자</S.Field>
                            <S.Field>작성일</S.Field>
                            <S.Field>처리 상태</S.Field>
                        </S.FirstRow>
                    </thead>
                    <tbody>
                        {complaintData.map((complaint, idx) => (
                            <S.Row key={complaint.complaintId}>
                                <S.Column>{complaintData.length-idx}</S.Column>
                                <S.Column>{complaint.categoryKorean}</S.Column>
                                <S.Column $align={"left"} onClick={() => {handleOpenComplaintProcessModal(complaint.complaintId); setSelectItem(complaint);}} style={{cursor: "pointer"}}>{complaint.title}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} onClick={() => navigate(`/users/${complaint.userId}`)} style={{cursor: "pointer"}}>{complaint.nickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(complaint.createdAt, 3)}</S.Column>
                                <S.Column style={{padding: "0px 16px"}}>
                                    <S.Text $size={"12px"} $weight={"700"} $color={getStatusAttribute(complaint.status).color} style={{backgroundColor:getStatusAttribute(complaint.status).bg, borderRadius: "5px", padding: "3px 0px"}}>{complaint.status}</S.Text>
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

export default ComplaintBoard;