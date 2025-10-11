import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type SignupDTO, SignupSchema } from "./dtos/signup.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtGuard } from "./guards/jwt-auth.guard";
import { Public } from "src/common/decorators/public.decorator";
import { ACCESS_TOKEN_KEY } from "./constants";
import type { Request, Response } from "express";
import { UserDTO } from "src/users/dtos/user.dto";
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
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const token = await this.authService.login(req.user as UserDTO);
        res.cookie(ACCESS_TOKEN_KEY, token, cookieConfig);
        console.log(token);

        return { success: true };
    }

    @Get("/profile")
    getProfile(@Req() req: Request) {
        return req.user;
    }
}
