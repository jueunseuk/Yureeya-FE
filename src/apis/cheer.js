import axios from "axios";
import instance from "./instance";

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const requestCheer = async () => {
    try {
        const response = await instance.post("/cheer");
        return response;
    } catch(error) {
        if(error.status) {
            alert("로그인 후 이용 가능합니다.");
        }
        const errorCode = error.response.data.code;
        if(errorCode === "CHEER_001") {
            
        } else if(errorCode === "CHEERS_002") {
            alert("응원은 1분에 한번씩 가능합니다!");
        }
    }
};

export const requestCheerCnt = async () => {
    try {
        const response = await axios.get(`${backendUrl}/cheer/total`);
        return response;
    } catch(error) {
        
    }
};

export const getUserCheerData = async (userId) => {
    try {
        const response = await instance.get(`/cheer/data/${userId}`);
        return response;
    } catch (error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert(error.response.message);
        }

        throw error;
    }
};

export const getUserCheerHisotry = async (userId) => {
    try {
        const response = await instance.get(`/cheer/history/${userId}`);
        return response;
    } catch (error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert(error.response.message);
        }

        throw error;
    }
};