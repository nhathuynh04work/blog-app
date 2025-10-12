"use client";

import clientApi from "@/lib/clientApi";
import { UserDTO } from "@/types/user";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

const AuthContext = createContext<{
	user: UserDTO | null;
	loading: boolean;
	error: Error | null;
}>({
	user: null,
	loading: true,
	error: null,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserDTO | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchUser() {
			try {
				const { data } = await clientApi.get<UserDTO>("/users/me");
				setUser(data);
			} catch (err) {
				setUser(null);
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		}

		fetchUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, error }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
