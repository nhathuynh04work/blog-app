"use server";

import axios from "axios";
import { cookies } from "next/headers";

const serverApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function serverApiGet(url: string) {
	const cookieHeader = await cookies();
	return serverApi.get(url, {
		headers: { Cookie: cookieHeader.toString() },
	});
}

export async function serverApiPost(url: string, data: unknown) {
	const cookieHeader = await cookies();
	return serverApi.post(url, data, {
		headers: { Cookie: cookieHeader.toString() },
	});
}

export async function serverApiPatch(url: string, data: unknown) {
	const cookieHeader = await cookies();
	return serverApi.patch(url, data, {
		headers: { Cookie: cookieHeader.toString() },
	});
}

export async function serverApiDelete(url: string) {
	const cookieHeader = await cookies();
	return serverApi.delete(url, {
		headers: { Cookie: cookieHeader.toString() },
	});
}

// Res interceptors
serverApi.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export default serverApi;
