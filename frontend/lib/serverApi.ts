"use server";

import axios from "axios";
import { cookies } from "next/headers";

const serverApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to forward cookies
serverApi.interceptors.request.use(async (config) => {
	try {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore.toString();
		if (cookieHeader) {
			config.headers = config.headers || {};
			config.headers.Cookie = cookieHeader;
		}
	} catch (err) {
		console.log(err);
	}
	return config;
});

// Res interceptors
serverApi.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export default serverApi;
