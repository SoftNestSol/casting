import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/auth.context";

const useAuthRedirect = (redirectTo, condition) => {
	const router = useRouter();
	const { currentUser, loading } = useAuthContext();

	useEffect(() => {
		if (loading) return;
		if (!condition(currentUser)) {
			router.push(redirectTo);
		}
	}, [currentUser, loading, redirectTo, router, condition]);
};

export default useAuthRedirect;
