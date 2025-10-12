import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type SignupDTO, SignupSchema } from "./dtos/signup.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public } from "src/common/decorators/public.decorator";
import { ACCESS_TOKEN_KEY } from "./constants";
import { cookieConfig } from "src/config/cookie";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("/signup")
    async signup(@Body(new ZodValidationPipe(SignupSchema)) data: SignupDTO) {
        return await this.authService.signup(data);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Req() req, @Res({ passthrough: true }) res) {
        const token = await this.authService.login(req.user);
        res.cookie(ACCESS_TOKEN_KEY, token, cookieConfig);

        return { success: true };
    }
}
