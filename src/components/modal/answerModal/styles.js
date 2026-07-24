import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    z-index: 999;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 600px;
    max-width: 100%;
    max-height: 85vh;
    padding: 30px;
    gap: 20px;
    border-radius: 10px;
    background-color: #F4F3E9;
    box-sizing: border-box;
    box-shadow: 0px 0px 16px rgb(0, 0, 0, 0.5);
    overflow-y: auto;
`;

export const HorizontalWrapper = styled.div`
    display: flex;
    justify-content: ${({$jc}) => $jc || "flex-start"};
    align-items: ${({$ai}) => $ai || "flex-start"};
    gap: ${({$gap}) => $gap};
`;

export const VerticalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${({$jc}) => $jc || "flex-start"};
    align-items: ${({$ai}) => $ai || "flex-start"};
    gap: ${({$gap}) => $gap};
`;

export const Text = styled.span`
    font-size: ${({$size}) => $size || "15px"};
    font-weight: ${({$weight}) => $weight || "400"};
    color: ${({$color}) => $color || "black"};
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid #D7D5C6;
`;

export const CloseButton = styled.button`
    padding: 0;
    border: none;
    background-color: transparent;
    color: #878787;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;

    &:hover {
        color: black;
    }
`;

export const QuestionArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 15px;
    padding: 18px;
    border-radius: 8px;
    background-color: white;
    box-sizing: border-box;
`;

export const Status = styled.span`
    padding: 3px 8px;
    border-radius: 5px;
    background-color: ${({$bg}) => $bg};
    color: ${({$color}) => $color};
    font-size: 11px;
    font-weight: 700;
`;

export const Sand = styled.span`
    flex-shrink: 0;
    padding: 4px 9px;
    border-radius: 5px;
    background-color: #EDE2B8;
    color: #806D2D;
    font-size: 11px;
    font-weight: 700;
`;

export const UserArea = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 8px;
    cursor: pointer;
`;

export const ProfileImage = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #E7E7E7;
    object-fit: cover;
`;

export const QuestionContent = styled.div`
    width: 100%;
    min-height: 60px;
    color: #444444;
    font-size: 14px;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const AnswerTitleArea = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 7px;
`;

export const AnswerList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 300px;
    min-height: 100px;
    gap: 10px;
    overflow-y: auto;
`;

export const AnswerItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    gap: 12px;
    border: 1px solid ${({$adopted}) => $adopted ? "#57B97A" : "#D7D5C6"};
    border-left: 5px solid ${({$adopted}) => $adopted ? "#57B97A" : "#C6BC73"};
    border-radius: 8px;
    background-color: ${({$adopted}) => $adopted ? "#F1FAF3" : "white"};
    box-sizing: border-box;
`;

export const AnswerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const AnswerContent = styled.div`
    width: 100%;
    color: #444444;
    font-size: 13px;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const AdoptButton = styled.button`
    padding: 6px 15px;
    border: 1px solid #57B97A;
    border-radius: 8px;
    background-color: white;
    color: #45A467;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        background-color: #F1FAF3;
    }
`;

export const AdoptedBadge = styled.span`
    padding: 2px 7px;
    border-radius: 5px;
    background-color: #57B97A;
    color: white;
    font-size: 10px;
    font-weight: 700;
`;

export const AdoptedDate = styled.span`
    align-self: flex-end;
    color: #57B97A;
    font-size: 10px;
`;

export const EmptyArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90px;
    border-radius: 8px;
    background-color: white;
`;

export const AnswerUploadArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    padding-top: 15px;
    border-top: 1px solid #D7D5C6;
`;

export const AnswerInput = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: white;
    outline: none;
    resize: none;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.6;
    box-sizing: border-box;

    &:focus {
        outline: 1px solid #C6BC73;
    }
`;

export const Button = styled.button`
    align-self: center;
    padding: 10px 50px;
    background-color: ${({$bg}) => $bg};
    border: none;
    border-radius: 15px;
    font-weight: 700;
    font-size: 16px;
    color: white;
    cursor: ${({disabled}) => disabled ? "not-allowed" : "pointer"};
    opacity: ${({disabled}) => disabled ? "0.5" : "1"};
`;

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 200px;
    border-radius: 10px;
    background-color: #F4F3E9;
`;