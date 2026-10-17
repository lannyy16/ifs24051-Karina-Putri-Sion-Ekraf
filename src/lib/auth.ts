import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { adapter } from "./db";

export const auth = betterAuth({
	database: adapter,
	rateLimit: {
		enabled: true,
		customRules: {
			"/sign-in/email": { window: 60, max: 5 },
			"/sign-up/email": { window: 60, max: 5 },
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	advanced: {
		cookiePrefix: "ekraftoba",
		useSecureCookies: process.env.NODE_ENV === "production",
		defaultCookieAttributes: {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
		},
	},
	session: {
		expiresIn: 60 * 60 * 24, // 24 hours
		updateAge: 60 * 60, // refresh at most hourly
		cookieCache: {
			enabled: true,
			maxAge: 60 * 15,
		},
	},
	plugins: [tanstackStartCookies()],
});

export default auth;
