import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border: 1px solid #E7E7E7;
    padding: 20px;
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

export const Title = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
`;

export const CheckBox = styled.div`
    width: 12px;
    height: 12px;
    background-color: ${({$bg}) => $bg};
    transition: background-color 0.2s ease, border-color 0.2s ease;
`;

export const Description = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: 13px;
    margin-top: 10px;
`;

export const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 20px;
`;

export const TextArea = styled.div`
    display: flex;
    align-items: center;
`;

export const Text = styled.div`
    font-size: ${({$size}) => $size || "13px"};
    font-weight: ${({$weight}) => $weight || "400"};
    color: ${({$color}) => $color || "black"};
`;

export const SortArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 7px;
`;

export const Sort = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: ${({$weight}) => $weight || "400"};
    cursor: default;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Comment = styled.span`
    padding: 1px 4px;
    margin-left: 5px;
    font-size: 10px;
    color: red;
    border: 1px solid #B7B7B7;
    border-radius: 5px;
`;

export const FirstRow = styled.tr`
    border-top: 1px solid black;
    border-bottom: 1px solid #878787;
`;

export const Row = styled.tr`
    border-bottom: 1px solid #B8B8B8;
    width: 100%;

    &:hover {
        background-color: rgb(250, 250, 250);;
    }
`;

export const Field = styled.th`
    font-size: 14px;
    padding: 8px;
    text-align: ${({$align}) => $align || "center"};
`;

export const Column = styled.td`
    font-size: ${({$size}) => $size || "13px"};
    max-width: 350px;
    padding: 8px;
    text-align: ${({$align}) => $align || "center"};
    color: ${({$color}) => $color || "black"};
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const PaginationArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 590px;
    gap: 10px;
    font-size: 12px;
    margin-top: 20px;
`;

export const PageButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: ${({$border}) => $border || "0px"} solid #C6BC73;
    color: #C6BC73;
    font-weight: ${({$weight}) => $weight || "400"};

    &:hover {
        text-decoration: underline;
    }
`;

export const UploadButton = styled.button`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    width: 225px;
    height: 30px;
    border: 1px solid #E7E7E7;
    background-color: white;
    color: #C6BC73;
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 15px;
`;