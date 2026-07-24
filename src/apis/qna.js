import instance from "./instance";

export const getQuestion = async (sort, direction, status) => {
    try {
        const response = await instance.get(`/question?status=${status}&sort=${sort}&direction=${direction}`, {headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            alert(error.response.data.message);
        } else {
        }

        throw error;
    }
}

export const uploadQuestion = async (form) => {
    try {
        const response = await instance.post("/question", form, {headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            elert(error.response.data.message);
        } else {
            elert("서버가 응답하지 않습니다.");
        }
    }
}

export const closeQuestion = async (questionId) => {
    try {
        const response = await instance.patch(`/question/${questionId}`, {headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            elert(error.response.data.message);
            throw error;
        } else {
            alert("서버가 원활하지 않습니다.\n 다시 시도해주세요.");
        }
    }
}

export const getAnswer = async (questionId) => {
    try {
        const response = await instance.get(`/question/${questionId}/answer`, {headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            alert(error.response.data.message);
        } else {
        }

        throw error;
    }
}

export const uploadAnswer = async (form, questionId) => {
    try {
        const response = await instance.post(`/question/${questionId}/answer`, form, {headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            elert(error.response.data.message);
        } else {
            elert("서버가 응답하지 않습니다.");
        }
    }
}

export const adoptAnswer = async (questionId, answerId) => {
    try {
        const response = await instance.patch(`/question/${questionId}/answer/${answerId}/adopt`, {headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            elert(error.response.data.message);
        } else {
            alert("서버가 원활하지 않습니다.\n 다시 시도해주세요.");
        }

        throw error;
    }
}