"use client";

import clientApi from "@/lib/clientApi";
import { UserDTO } from "@/types/user";
import { useRouter } from "next/navigation";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { toast } from "sonner";

const AuthContext = createContext<{
	user: UserDTO | null;
	loading: boolean;
	error: Error | null;
	logout: (() => void) | null;
}>({
	user: null,
	loading: true,
	error: null,
	logout: null,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserDTO | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const router = useRouter();

	async function logout() {
		try {
			await clientApi.get("/auth/logout");
			toast.success("Logged out successfully");
			router.push("/auth/login");
			router.refresh();
		} catch (err) {
			toast.error("Failed to log out");
		}
	}

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
		<AuthContext.Provider value={{ user, loading, error, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
