import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 24px;
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    background-color: #ffffff;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 16px;
    }
`;

export const Blank = styled.br`
    line-height: 170%;
`;

export const Contour = styled.hr`
    width: 100%;
    height: 1px;
    margin: 24px 0;
    border: 0;
    background-color: #e7e2bf;
`;

export const Title = styled.h1`
    margin: 0 0 12px;
    font-size: 30px;
    color: #303030;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

export const SubTitle = styled.h2`
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 700;
    color: #756b2f;
`;

export const Text = styled.p`
    margin: 0;
    font-size: ${({ $size }) => $size || "15px"};
    font-weight: ${({ $weight }) => $weight || "500"};
    line-height: 1.7;
    color: ${({ $color }) => $color || "#505050"};
    word-break: keep-all;
`;

export const Category = styled.section`
    width: 100%;
    margin-bottom: 40px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const FaqList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid #e7e7e7;
`;

export const FaqItem = styled.div`
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
`;

export const QuestionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 56px;
    padding: 15px 14px;
    border: 0;
    background-color: transparent;
    color: #404040;
    text-align: left;
    cursor: pointer;

    &:hover {
        background-color: #faf9f3;
    }

    &:focus-visible {
        outline: 2px solid #c6bc73;
        outline-offset: -2px;
    }
`;

export const QuestionText = styled.span`
    padding-right: 20px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.5;
    word-break: keep-all;
`;

export const ToggleIcon = styled.span`
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 23px;
    font-weight: 400;
    line-height: 1;
    color: #81773e;
    transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(45deg)" : "rotate(0deg)"};
    transition: transform 0.2s ease;
`;

export const AnswerWrapper = styled.div`
    display: grid;
    grid-template-rows: ${({ $isOpen }) =>
        $isOpen ? "1fr" : "0fr"};
    visibility: ${({ $isOpen }) =>
        $isOpen ? "visible" : "hidden"};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition:
        grid-template-rows 0.25s ease,
        opacity 0.2s ease,
        visibility 0.2s ease;
`;

export const Answer = styled.div`
    min-height: 0;
    overflow: hidden;
    padding: 0 48px 0 14px;
    font-size: 14px;
    line-height: 1.8;
    color: #606060;
    word-break: keep-all;

    ${AnswerWrapper}[style] & {
        padding-bottom: 0;
    }

    ${QuestionButton}[aria-expanded="true"] + ${AnswerWrapper} & {
        padding-top: 2px;
        padding-bottom: 18px;
    }

    @media (max-width: 768px) {
        padding-right: 14px;
    }
`;

export const Link = styled.a`
    color: #505050;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;