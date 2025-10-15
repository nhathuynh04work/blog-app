"use server";

import axios, { AxiosHeaders } from "axios";
import { cookies } from "next/headers";

const serverApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Axios request interceptor to attach cookie automatically
serverApi.interceptors.request.use(async (config) => {
	const cookieHeader = await cookies();
	const cookie = cookieHeader.toString();

	if (cookie) {
		config.headers = new AxiosHeaders(config.headers).set("Cookie", cookie);
	}

	return config;
});

// Response interceptor
serverApi.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export default serverApi;
