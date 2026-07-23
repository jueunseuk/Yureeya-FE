import axios from "axios";
import instance from "./instance";

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const getGalleryUpload = async (formData) => {
    try {
        const response = await instance.post("/gallery/upload", formData);
        return response;
    } catch (error) {
        alert("업로드 실패!");
        throw error;
    }
};

export const getGalleryUpdate = async (galleryId, formData) => {
    try {
        const response = await instance.post(`/gallery/${galleryId}`, formData);
        return response;
    } catch (error) {
        alert("갤러리 수정 실패!");
        throw error;
    }
};

export const getRandomImages = async (amount) => {
    try {
        const response = await axios.get(`${backendUrl}/gallery/random/${amount}`);
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            console.log("갤러리를 불러오는 데 실패했습니다.");
        } else {
            console.log("서버가 응답하지 않습니다.");
        }
    }
};

export const getAllGalleryImages = async (form) => {
    try {
        const response = await instance.get(`${backendUrl}/gallery`, {params: form, headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        console.log(error)
        if(error.response && error.response.data) {
            console.log("갤러리를 불러오는 데 실패했습니다.");
        } else {
            console.log("서버가 응답하지 않습니다.");
        }
    }
};

export const getGallery = async (galleryId) => {
    try {
        const response = instance.get(`/gallery/${galleryId}`, {headers: {Accept: "application/json"}});
        return response;
    } catch(error) {
        if(error.response && error.response.data) {
            console.log("갤러리를 불러오는 데 실패했습니다.");
        } else {
            console.log("서버가 응답하지 않습니다.");
        }
    }
};

export const deleteGallery = async (galleryId) => {
    try {
        instance.delete(`/gallery/${galleryId}`, {headers: {Accept: "application/json"}});
    } catch(error) {
        if(error.response && error.response.data) {
            console.log("갤러리를 삭제하는 데 실패했습니다.");
        } else {
            console.log("서버가 응답하지 않습니다.");
        }
    }
}