import * as G from "@/apis/gallery";
import * as T from "@/apis/tag";
import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import upload from "@/assets/icon/gallery/upload.svg";
import GalleryUpload from "@/components/modal/galleryUpload";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { useEffect, useState } from "react";
import { SkeletonItem } from "@/common/skeleton/Skeleton";
import { formatDate } from "@/util/dateFormatter";

const GalleryBoard = () => {
    const {subPath} = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const sort = searchParams.get("sort") || "picturedAt";
    const name = searchParams.get("name") || null;
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skeleton, setSkeleton] = useState(true);
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [tagData, setTagData] = useState([]);

    const handleToggle = () => {
        setIsToggleOpen(prev => !prev);
    };

    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;

    const handleClickSort = (value) => {
        setSearchParams({ page: 1, sort : value });
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleClickPage = (pageNum) => {
        setSearchParams({ page: pageNum, sort : sort });
    }

    const handleClickTag = (target) => {
        if(name === target) {
            setSearchParams({page: page, sort: sort});
        } else {
            setSearchParams({page: page, sort: sort, name: target});
        }
    };

    const handleNavigateGallery = (galleryId) => {
        navigate(`/gallery/${galleryId}`);
    }

    const fetchImages = async () => {
        try {
            setSkeleton(true);
            if(name) {
                const response = await G.getAllGalleryImages({page: page > 0 ? page - 1 : 0, sort, "name": name});
                setImages(response.data.content);
                setTotalElements(response.data.totalElements);
                setTotalPage(response.data.totalPages);
            } else {
                const response = await G.getAllGalleryImages({page: page > 0 ? page - 1 : 0, sort});
                setImages(response.data.content);
                setTotalElements(response.data.totalElements);
                setTotalPage(response.data.totalPages);
            }
        } catch(error) {
            
        } finally {
            setSkeleton(false);
        }
    };

    const fetchGalleryTags = async () => {
        if(!isToggleOpen) {
            return;
        }

        try {
            const response = await T.getTagList();
            setTagData(response.data);
        } catch(error) {

        }
    };

    useEffect(() => {
        fetchImages();
    }, [searchParams, sort, name]);

    useEffect(() => {
        fetchGalleryTags();
    }, [isToggleOpen])

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
                {isModalOpen && <GalleryUpload onClose={handleCloseModal} />}
                <S.Title>{boardInfo.label}</S.Title>
                <S.Description>{boardInfo.description}</S.Description>
                <BC.VerticalWrapper $ai={"flex-start"} style={{padding: "8px 12px", backgroundColor: "#faf7e2", marginTop: "10px", cursor: "pointer"}}>
                    <BC.HorizontalWrapper $jc={"flex-start"} onClick={handleToggle} style={{width: "100%"}}>
                        <BC.Text $size={"12px"} style={{width: "20px"}}>{!isToggleOpen ? "▶" : "▼"}</BC.Text>
                        <BC.Text $size={"14px"} $weight={"800"}>태그</BC.Text>
                    </BC.HorizontalWrapper>
                    {isToggleOpen && (
                        <BC.HorizontalWrapper $jc={"flex-start"} $gap={"7px"} style={{flexWrap: "wrap", padding: "7px 0"}}>
                            {tagData.map((tag) => (
                                <BC.Text key={tag.tagId} $color={name === null ? "white" : tag.name === name ? "#fff" : "#7A7348"} $size={"13px"} style={{backgroundColor: name === null ? "#C6BC73" : tag.name === name ? "#C6BC73" : "#fff", borderRadius: "5px", padding: "1px 4px", transition: "all 0.2s ease"}}
                                    onClick={() => handleClickTag(tag.name)}
                                >#{tag.name}</BC.Text>
                            ))}
                        </BC.HorizontalWrapper>
                    )}
                </BC.VerticalWrapper>
                <S.Header>
                    <S.TextArea>
                        <S.Text $size={"11px"} $weight={"700"}>{totalElements}</S.Text>
                        <S.Text $size={"11px"}>개의 사진</S.Text>
                    </S.TextArea>
                    <S.GalleryUploadButton onClick={handleOpenModal}>
                        <S.Icon src={upload}></S.Icon>유리 사진 업로드
                    </S.GalleryUploadButton>
                    <S.SortArea>
                        <S.Sort title="최근에 찍은 사진 순으로 정렬" onClick={() => handleClickSort("picturedAt")} $weight={sort === "picturedAt" ? 700 : ""}>New</S.Sort>
                        <S.Text $size={"11px"}>|</S.Text>
                        <S.Sort title="사용자의 최근 업로드 순으로 정렬" onClick={() => handleClickSort("createdAt")} $weight={sort === "createdAt" ? 700 : ""}>History</S.Sort>
                    </S.SortArea>
                </S.Header>
                <S.Contour />
                <S.GalleryArea>
                    {skeleton ? 
                        (
                            Array.from({length: 16}).map((_, idx) => (
                                <SkeletonItem key={idx}/>
                            ))
                        ) :
                        (
                            images?.map((image) => (
                                <S.GalleryItem key={image.galleryImageId} $imageUrl={image.imageUrl} onClick={() => handleNavigateGallery(image.galleryId)}>
                                    <S.OverlayText $size={"13px"} $weight={"300"} style={{color: "#dadadaff"}}>{formatDate(image.pictureAt, 2)}</S.OverlayText>
                                    <S.OverlayText $size={"15px"} $weight={"600"} >{image.title}</S.OverlayText>
                                    <S.OverlayText $size={"11px"} $weight={"500"} style={{color: "#dadadaff"}}>@{image.nickname}</S.OverlayText>
                                </S.GalleryItem>
                            ))
                        )
                    }
                </S.GalleryArea>
                <S.PaginationArea>
                    {getPageComponent()}
                </S.PaginationArea>
            </S.Wrapper>
        </>
    )
}

export default GalleryBoard;