import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type SignupDTO, SignupSchema } from "./dtos/signup.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signup")
    async signup(@Body(new ZodValidationPipe(SignupSchema)) data: SignupDTO) {
        return await this.authService.signup(data);
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
