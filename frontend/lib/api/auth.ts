import { LoginDTO } from "@/app/auth/dtos/login.dto";
import clientApi from "./clientApi";
import { SignupDTO } from "@/app/auth/dtos/signup.dto";

export async function login(input: LoginDTO) {
	await clientApi.post("/auth/login", input);
}

export async function signup(input: SignupDTO) {
	await clientApi.post("/auth/signup", input);
}
