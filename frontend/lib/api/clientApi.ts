import axios from "axios";

const clientApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
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
