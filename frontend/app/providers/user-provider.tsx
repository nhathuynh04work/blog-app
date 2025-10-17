"use client";

import { createContext, ReactNode, useContext } from "react";
import { User } from "@/types/user";

type UserContextValue = { user: User | null };

export const UserContext = createContext<UserContextValue>({ user: null });

export default function UserProvider({
	user,
	children,
}: {
	user: User | null;
	children: ReactNode;
}) {
	return (
		<UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
