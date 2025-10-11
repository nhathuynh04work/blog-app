import clientApi from "@/lib/clientApi";
import { LoginDTO } from "../dtos/login.dto";

export async function login(input: LoginDTO) {
	const { data } = await clientApi.post("/auth/login", input);
	return data;
}
