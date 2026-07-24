import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const TitleArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 24px;
`;

export const Text = styled.div`
    font-size: ${({$size}) => $size || "13px"};
    font-weight: ${({$weight}) => $weight || "400"};
    color: ${({$color}) => $color || "black"};
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid black;
`;

export const Row = styled.tr`
    border-top: 1px solid #B8B8B8;

    &:hover {
        background-color:rgb(250, 250, 250);
    }
`;

export const FirstColumn = styled.td`
    padding: 8px;
    text-align: ${({$align}) => $align || "center"};
`;

export const Column = styled.td`
    padding: 8px;
    text-align: ${({$align}) => $align || "center"};
`;

export const Comment = styled.span`
    padding: 1px 4px;
    margin-left: 5px;
    font-size: 10px;
    color: red;
    border: 1px solid #B7B7B7;
    border-radius: 5px;
`;

export const EmptyArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
`;