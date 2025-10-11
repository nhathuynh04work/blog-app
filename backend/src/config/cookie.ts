import { CookieOptions } from "express";

export const cookieConfig: CookieOptions = {
    httpOnly: true,
    maxAge: 3600 * 1000,
    sameSite: "none",
    secure: false,
};
