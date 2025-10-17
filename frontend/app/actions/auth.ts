"use server";

import serverApi from "@/app/actions/serverApi";
import { User } from "@/types/user";

export async function getMe(): Promise<User> {
	const { data } = await serverApi.get("/users/me");
	return data;
}
