import api from "@/lib/axios";
import { LoginDTO } from "../dtos/login.dto";

export async function login(input: LoginDTO) {
	const { data } = await api.post("/auth/login", input);
	console.log(data);
	return data;
}
