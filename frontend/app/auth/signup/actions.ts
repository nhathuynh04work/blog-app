import api from "@/lib/clientApi";
import { SignupDTO } from "../dtos/signup.dto";

export async function signup(input: SignupDTO) {
	await api.post("/auth/signup", input);
}
