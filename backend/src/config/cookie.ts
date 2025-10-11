import { CookieOptions } from "express";

export const cookieConfig: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 3600 * 1000,
};
