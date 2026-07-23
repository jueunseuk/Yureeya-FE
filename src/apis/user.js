import instance from "./instance";

export const getUserSidebar = async () => {
    try {
        const response = await instance.get(`/user/sidebar`);
        return response;
    } catch (error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const getLocalInfo = async () => {
    try {
        const response = await instance.get(`/user/me/basic`);
        return response;
    } catch (error) {
        const errorCode = error.response.data.code;

        throw error;
    }
};

export const getUserProfileData = async () => {
    try {
        const response = await instance.get(`/user/me`);
        return response;
    } catch(error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const getOtherProfileData = async (otherId) => {
    try {
        const response = await instance.get(`/user/${otherId}`);
        return response;
    } catch(error) {
        throw error;
    }
};

export const patchUserInformation = async (userData) => {
    try {
        const response = await instance.patch(`/user/profile/info`, userData);
        return response;
    } catch(error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const patchUserProfile = async (formData) => {
    try {
        const response = await instance.patch(`/user/profile/image`, formData);
        return response;
    } catch(error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const patchUserProfileRandom = async () => {
    try {
        const response = await instance.patch(`/user/me/profile/random`);
        return response;
    } catch(error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const getUserActivityData = async (userId) => {
    try {
        const response = await instance.get(`/user/${userId}/activity`);
        return response;
    } catch(error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const patchUserActivityCntWithSync = async () => {
    try {
        const response = await instance.patch(`/user/profile/refresh`);
        return response;
    } catch(error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const getUserPosts = async (searchId, form) => {
    try {
        const response = await instance.get(`/user/${searchId}/posts`, 
            {params: form, headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        const errorCode = error.response.code;

        throw error;
    }
};

export const getUserEmpathyPosts = async (searchId, form) => {
    try {
        const response = await instance.get(`/user/${searchId}/empathized-post`, 
            {params: form, headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert("해당 사용자를 찾을 수 없습니다.");
        }

        throw error;
    }
};

export const getUserComments = async (searchId, form) => {
    try {
        const response = await instance.get(`/user/${searchId}/comments`, 
            {params: form, headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert("해당 사용자를 찾을 수 없습니다.");
        }

        throw error;
    }
};

export const getUserImages = async (searchId, form) => {
    try {
        const response = await instance.get(`/user/${searchId}/images`, 
            {params: form, headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert("해당 사용자를 찾을 수 없습니다.");
        }

        throw error;
    }
};

export const postConvertGlass = async () => {
    try {
        const response = await instance.post(`/user/glass/convert`);
        return response;
    } catch(error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert("해당 사용자를 찾을 수 없습니다.");
        } else if(errorCode === "GLASS_002") {
            alert("모래알의 수량이 부족합니다.")
        } else if(errorCode === "GLASS_003") {
            alert("활동 온도가 1800℃보다 낮습니다.")
        } else if(errorCode === "GLASS_002") {
            
        }

        throw error;
    }
};

export const getUserList = async () => {
    try {
        const response = await instance.get(`/user/list`);
        return response;
    } catch(error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert("해당 사용자를 찾을 수 없습니다.");
        }

        throw error;
    }
};

export const getUserEmoticon = async () => {
    try {
        const response = await instance.get(`/user/emoticon`);
        return response;
    } catch(error) {
        const errorCode = error.response.code;
        
        if(errorCode === "USER_001") {
            alert("해당 사용자를 찾을 수 없습니다.");
        }

        throw error;
    }
};