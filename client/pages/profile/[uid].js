import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMembersData } from "../../contexts/firebase";

const UserProfile = () => {
	const router = useRouter();
	const { uid } = router.query;
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const members = await getMembersData();
			const user = members.find((member) => member.uid === uid);
			setUserData(user);
		};

		if (uid) {
			fetchData();
		}
	}, [uid]); // Depend on uid

	if (!userData) {
		return <div>Loading...</div>; // Render loading state while data is being fetched
	}

	return (
		<div>
			<h1>{userData.name}</h1>
			{/* Display other user data */}
		</div>
	);
};

export default UserProfile;
