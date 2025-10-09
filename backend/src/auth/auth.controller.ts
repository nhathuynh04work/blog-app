import { Body, Controller, Post } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type SignupDTO, SignupSchema } from "./dtos/signup.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signup")
    async signup(@Body(new ZodValidationPipe(SignupSchema)) data: SignupDTO) {
        return await this.authService.signup(data);
    }
}
