import { CookieOptions } from "express";

export const cookieConfig: CookieOptions = {
    httpOnly: true,
    maxAge: 3600 * 1000,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? undefined : "localhost",
};
