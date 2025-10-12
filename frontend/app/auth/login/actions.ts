import { LoginDTO } from "../dtos/login.dto";
import clientApi from "@/lib/clientApi";

export async function login(input: LoginDTO) {
	const { data } = await clientApi.post("/auth/login", input);
	return data;
}
