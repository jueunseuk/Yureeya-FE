import * as S from "./styles";
import * as U from "@/apis/user";
import * as BC from "@/common/basic/BasicComponent";
import default_profile from "@/assets/image/default_profile.jpg";
import { useRef, useState } from "react";
import cancel from "@/assets/icon/etc/cancel.svg";
import useUserInfo from "@/hooks/localStorage";

const MAX_SIZE = 5 * 1024 * 1024;

const UserProfileUpdateModal = ({onClose, user}) => {
    const [userRevision, setUserRevision] = useState(user);
    const [userProfileRevision, setUserProfileRevisoin] = useState(null);
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(userRevision.profileUrl);
    const prevUser = useUserInfo();

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleClickDefault = async () => {
        const response = await fetch(default_profile);
        const blob = await response.blob();
        const file = new File([blob], "default_profile.jpg", {type: blob.type});
        setImagePreview(default_profile);
        setUserProfileRevisoin(file);
    };

    const handleClickRandom = async () => {
        try {
            const profileResponse = await U.patchUserProfileRandom();

            localStorage.setItem("userInfo", JSON.stringify({
                ...prevUser,
                profileUrl: profileResponse?.data
            }));
            alert("변경 완료!\n페이지가 새로고침 됩니다.");
            window.location.reload();
        } catch (error) {
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if(file.size > MAX_SIZE) {
            alert("파일의 크기가 너무 큽니다.\n5MB 이하의 이미지만 업로드 가능합니다.");
            return;
        }

        const fileURL = URL.createObjectURL(file);
        setImagePreview(fileURL);

        setUserProfileRevisoin(file);
    };

    const handleReviseUserInformation = async () => {
        try {
            const infoResponse = await U.patchUserInformation(userRevision);

            let profileResponse = null;
            if(userProfileRevision) {
                const formData = new FormData();
                formData.append("request", userProfileRevision);
                profileResponse = await U.patchUserProfile(formData);
            }

            localStorage.setItem("userInfo", JSON.stringify({
                ...prevUser,
                nickname: infoResponse.data.nickname,
                name: infoResponse.data.name,
                profileUrl: profileResponse?.data || prevUser.profileUrl
            }));
            
            alert("수정 완료!");
            window.location.reload();
        } catch (error) {
        } finally {
        }
    };

    return (
        <S.Wrapper>
            <S.Content>
                <S.HorizontalWrapper $jc={"center"} >
                    <S.Text $size={"18px"} $weight={"700"} >내 정보 수정</S.Text>
                    <S.Icon src={cancel} onClick={onClose} />
                </S.HorizontalWrapper>
                <S.VerticalWrapper $gap={"20px"}>
                    <S.VerticalWrapper $ai={"flex-start"} $gap={"5px"}>
                        <S.Text $size={"15px"} $weight={"600"} style={{paddingLeft: "5px"}} onClick={handleDivClick}>프로필 사진</S.Text>
                        <S.InputImage src={imagePreview ? imagePreview : userRevision.profileUrl} onClick={handleDivClick}></S.InputImage>
                        <BC.Text $size={"12px"} $color={"#878787"} style={{cursor: "pointer", width: "150px", textAlign: "center"}}
                            onClick={handleClickDefault}
                        >기본으로 설정</BC.Text>
                        <BC.Text $size={"12px"} $color={"#878787"} style={{cursor: "pointer", width: "150px", textAlign: "center"}}
                            onClick={handleClickRandom}
                        >랜덤으로 설정</BC.Text>
                        <S.FileInput type="file" accept="image/png, image/jpg, image/jpeg" ref={fileInputRef} onChange={handleImageChange}/>
                    </S.VerticalWrapper>
                    <S.VerticalWrapper $ai={"flex-start"} $gap={"5px"}>
                        <S.Text $size={"15px"} $weight={"600"} style={{paddingLeft: "5px"}} >이름</S.Text>
                        <S.Input $width={"220px"} value={userRevision.name} onChange={(e) => setUserRevision({...userRevision, name : e.target.value})} />
                    </S.VerticalWrapper>
                    <S.VerticalWrapper $ai={"flex-start"} $gap={"5px"}>
                        <S.Text $size={"15px"} $weight={"600"} style={{paddingLeft: "5px"}} >닉네임</S.Text>
                        <S.Input $width={"220px"} value={userRevision.nickname} onChange={(e) => setUserRevision({...userRevision, nickname : e.target.value})} />
                    </S.VerticalWrapper>
                    <S.VerticalWrapper $ai={"flex-start"} $gap={"5px"}>
                        <S.Text $size={"15px"} $weight={"600"} style={{paddingLeft: "5px"}} >성별</S.Text>
                        <S.Select value={userRevision.gender} onChange={(e) => setUserRevision({...userRevision, gender : e.target.value})}>
                            <option value={"MALE"}>남자</option>
                            <option value={"FEMALE"}>여자</option>
                            <option value={"NEITHER"}>선택하지 않음</option>
                        </S.Select>
                    </S.VerticalWrapper>
                    <S.VerticalWrapper $ai={"flex-start"} $gap={"5px"}>
                        <S.Text $size={"15px"} $weight={"600"} style={{paddingLeft: "5px"}} >나이</S.Text>
                        <S.Input $width={"110px"} value={userRevision.age} onChange={(e) => setUserRevision({...userRevision, age : e.target.value})} />
                    </S.VerticalWrapper>
                    <S.VerticalWrapper $ai={"flex-start"} $gap={"5px"}>
                        <S.Text $size={"15px"} $weight={"600"} style={{paddingLeft: "5px"}} >한 줄 인사</S.Text>
                        <S.TextArea $width={"220px"} value={userRevision.introduction} onChange={(e) => setUserRevision({...userRevision, introduction : e.target.value})} />
                    </S.VerticalWrapper>
                </S.VerticalWrapper>
                <S.SubmitButton onClick={handleReviseUserInformation} disabled={
                    userRevision.name.length < 2 || userRevision.nickname.length < 2 || userRevision.age?.length == 0 || userRevision.gender?.length == 0
                }>수정하기</S.SubmitButton>
            </S.Content>
        </S.Wrapper>
    );
};

export default UserProfileUpdateModal;