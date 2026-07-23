import * as G from "@/apis/gallery";
import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import cancel from "@/assets/icon/gallery/cancel.svg";
import upload from "@/assets/icon/gallery/upload.svg";
import help from "@/assets/icon/gallery/help.svg";
import uploadFile from "@/assets/icon/gallery/upload_file.png";
import { useRef, useState } from "react";

const MAX_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;
const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

const GalleryUpload = ({onClose}) => {
    const fileInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(today);
    const [tag, setTag] = useState([]);
    const [uploadButtonText, setUploadButtonTest] = useState("사진 올리기");

    const handleClickFileUpload = () => {
        fileInputRef.current.click();
    }

    const handleRemoveFile = (index) => {
        setImagePreviews((prev) =>
            prev.filter((_, i) => i !== index)
        );
        setUploadedFiles((prev) => 
            prev.filter((_, i) => i !== index)
        );
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;
    
        const remainingSlots = MAX_FILES - uploadedFiles.length;
        const selectedFiles = files.slice(0, remainingSlots);
    
        const validFiles = [];
        const previews = [];
    
        selectedFiles.forEach((file) => {
          if (file.size > MAX_SIZE) {
            alert(`${file.name}의 크기가 너무 큽니다.`);
            return;
          }
    
          validFiles.push(file);
          previews.push(URL.createObjectURL(file));
        });
    
        setUploadedFiles((prev) => [...prev, ...validFiles]);
        setImagePreviews((prev) => [...prev, ...previews]);
    
        event.target.value = "";
    };

    const requestGalleryUpload = async () => {
        try {
            setUploadButtonTest("업로드 중");
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("picturedAt", `${date}T00:00:00`);
            formData.append("type", "CYR");
            if(tag) {
                const validTags = tag.filter(t => t.trim() !== "");
                validTags.forEach(t => {
                    formData.append("tag", t);
                });
            }

            uploadedFiles.forEach((file) => {
                formData.append("images", file);
            });

            await G.getGalleryUpload(formData);
            
            setUploadButtonTest("업로드 완료");
            alert("업로드 성공!");
            window.location.reload();
        } catch(error) {

        }
    };

    const handleAddTag = () => {
        setTag((prev) => [...prev, ""]);
    };

    const handleChangeTag = (index, value) => {
        setTag((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    return (
        <>
            <S.Wrapper>
                <S.Content>
                    <S.HorizontalWrapper $justify={"space-between"}>
                        <S.TooltipWrapper>
                            <S.Icon src={help} $width={"15px"} $height={"15px"}></S.Icon>
                            <S.TooltipText>
                                <p style={{fontSize: "16px", fontWeight:"700", marginBottom: "5px"}}>갤러리 업로드 가이드</p>
                                <p style={{fontSize:"14px"}}>1. 다른 날짜에 찍힌 사진은 다른 게시글로 분리해주세요!</p>
                                <p style={{fontSize:"14px"}}>2. 사진은 게시글당 최대 10장 업로드 가능합니다!</p>
                                <p style={{fontSize:"14px"}}>3. 촬영일은 나중에 수정 가능하므로 촬영일이 모호하더라도 일단 업로드 하셔도 됩니다!</p>
                                <p style={{fontSize:"14px"}}>4. 이미지의 사이즈는 개별 최대 10MB입니다!</p>
                                <p style={{fontSize:"14px"}}>5. 제목은 가능한 짧게! 설명은 가능한 길게! 부탁드려요.</p>
                                <p style={{fontSize:"14px"}}>6. 태그는 가능한 많이 사용되는 단어들로 구성해주세요.</p>
                            </S.TooltipText>
                        </S.TooltipWrapper>
                        <S.Icon src={upload} $width={"25px"} $height={"25px"}></S.Icon>
                        <S.Icon src={cancel} onClick={onClose}></S.Icon>
                    </S.HorizontalWrapper>
                    <S.InputArea>
                        <S.HorizontalWrapper>
                            <S.Text $size={"16px"} $weight={"700"}>제목</S.Text>
                        </S.HorizontalWrapper>
                        <S.InputTitle value={title} onChange={(e) => setTitle(e.target.value)}></S.InputTitle>
                    </S.InputArea>
                    <S.InputArea>
                        <S.HorizontalWrapper>
                            <S.Text $size={"16px"} $weight={"700"}>설명</S.Text>
                        </S.HorizontalWrapper>
                        <S.InputDesc value={description} onChange={(e) => setDescription(e.target.value)}></S.InputDesc>
                    </S.InputArea>
                    <S.InputArea>
                        <S.HorizontalWrapper>
                            <S.Text $size={"16px"} $weight={"700"}>파일 업로드</S.Text>
                        </S.HorizontalWrapper>
                        <S.FileArea>
                            <S.FileUploadButton $imageUrl={uploadFile} onClick={handleClickFileUpload}></S.FileUploadButton>
                            {imagePreviews.map((url, idx) => (
                                <S.FileItem key={idx} src={url} alt={`preview-${idx}`} onClick={() => handleRemoveFile(idx)} />
                            ))}
                        </S.FileArea>
                        <S.FileInput type="file" accept="image/png, image/jpg, image/jpeg" multiple ref={fileInputRef} onChange={handleImageChange}/>
                    </S.InputArea>
                    <S.InputArea>
                        <S.HorizontalWrapper>
                            <S.Text $size={"16px"} $weight={"700"}>촬영일</S.Text>
                        </S.HorizontalWrapper>
                        <S.InputDate value={date} max={today} onChange={(e) => setDate(e.target.value)}></S.InputDate>
                    </S.InputArea>
                    <S.InputArea>
                        <S.HorizontalWrapper>
                            <S.Text $size={"16px"} $weight={"700"}>관련 태그</S.Text>
                        </S.HorizontalWrapper>
                        <BC.HorizontalWrapper $jc={"flex-start"} $gap={"8px"} style={{flexWrap: "wrap", width: "100%"}}>
                            {tag.map((t, idx) => (
                                <input key={idx} value={t} type={"text"} style={{width: "100px", height: "40px", borderRadius: "8px", outline: "none", border: "none", padding: "10px"}}
                                    onChange={(e) => handleChangeTag(idx, e.target.value)}
                                />
                            ))}
                            <BC.EmptyBox $w={"100px"} $h={"40px"} $radius={"8px"} $size={"18px"} style={{backgroundColor: "white", cursor: "pointer"}}
                                onClick={handleAddTag}
                            >+</BC.EmptyBox>
                        </BC.HorizontalWrapper>
                    </S.InputArea>
                    <S.SubmitButton disabled={uploadedFiles.length === 0 ||
                        title.length < 5 ||
                        title.length > 15 ||
                        description.length < 10 ||
                        date.length === 0}
                        onClick={requestGalleryUpload}
                    >{uploadButtonText}</S.SubmitButton>
                </S.Content>
            </S.Wrapper>
        </>
    );
}

export default GalleryUpload;