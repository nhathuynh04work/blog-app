import axios from "axios";

const clientApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to forward cookies
clientApi.interceptors.request.use((config) => {
	return config;
});

// Res interceptors
clientApi.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export default clientApi;
