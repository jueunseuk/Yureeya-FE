import * as BC from "@/common/basic/BasicComponent";
import * as UI from "@/apis/inventory";
import * as UNS from "@/apis/userNicknameSetting";
import { useEffect, useState } from "react";
import styled from "styled-components";

const NicknameSetting = () => {
    const [colorData, setColorData] = useState([]);
    const [selectItem, setSelectItem] = useState();
    const [statusMessage, setStatusMessage] = useState({
        message: "",
        type: ""
    });

    const fetchNicknameColor = async () => {
        try {
            const categoryId = 3;
            const response = await UI.getBuyList(categoryId);
            setColorData(response.data);
        } catch(error) {

        }
    };

    const fetchUserNicknameColor = async () => {
        try {
            const response = await UNS.getUserNicknameColor();
            setSelectItem(response.data);
        } catch(error) {

        } finally {
            setTimeout(() => (
                setStatusMessage({message: "", type: ""})
            ), [10000]);
        }
    };

    const handleUserNicknameColor = async () => {
        try {
            setStatusMessage({ message: "저장 중..", type: "loading" });
            await UNS.postUserNicknameColor({"shopItemId": selectItem ? selectItem.shopItemId : null});
            setStatusMessage({ message: "저장 완료", type: "success" });
        } catch(error) {
            setStatusMessage({ message: "저장 실패", type: "error" });
        }
    };

    useEffect(() => {
        fetchNicknameColor();
        fetchUserNicknameColor();
    }, []);

    const getMessageColor = (type) => {
        switch(type) {
            case "loading": return "#aaa";
            case "success": return "#4CAF50";
            case "error": return "#E74C3C";
        }
    };

    return (
        <BC.VerticalWrapper $jc={"space-between"} $ai={"flex-start"} $gap={"15px"} style={{width: "100%", marginTop: "20px"}}>
            <BC.HorizontalWrapper $jc={"flex-start"} $gap={"5px"} style={{flexWrap: "wrap", width: "100%"}}>
                {
                    colorData.length > 0 ?
                    colorData.map((item) => (
                        <ColorItem key={item.shopItemId} onClick={() => setSelectItem(item == selectItem ? null : item)} $border={selectItem?.shopItemId === item.shopItemId ? item.description: ""}>
                            <BC.Text $size={"14px"} $weight={"600"} $color={item.description}>{item.name}</BC.Text>
                            <BC.Text $size={"12px"}>{item.description}</BC.Text>
                        </ColorItem>
                    ))
                    :
                    <BC.EmptyBox $width="100%" $size="13px">보유한 닉네임 색상이 없습니다.</BC.EmptyBox>
                }
            </BC.HorizontalWrapper>
            <BC.VerticalWrapper $ai={"flex-end"}>
                <Button $bg={"#C6BC73"} $color={"white"} onClick={handleUserNicknameColor}>저장하기</Button>
                {statusMessage && <BC.Text $size={"11px"} $color={getMessageColor(statusMessage.type)} style={{width: "80px", textAlign: "center"}}>{statusMessage.message}</BC.Text>}
            </BC.VerticalWrapper>
        </BC.VerticalWrapper>
    );
};

export default NicknameSetting;

export const ColorItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    border: 2px solid ${({$border}) => $border || "#eee"};
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        scale: 1.02;
    }
`;

export const Button = styled.button`
    width: 80px;
    padding: 8px 0;
    border: none;
    border-radius: 7px;
    font-weight: 700;
    font-size: 13px;
    outline: none;
    transition: all 0.2s ease;
    cursor: pointer;

    &: hover {
        background-color: ${({$bg}) => $bg};
        color: ${({$color}) => $color || "black"};
    }
`;
