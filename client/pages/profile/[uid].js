import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../../contexts/firebase";
import { useAuthContext } from "../../contexts/auth.context";

const UserProfile = () => {
	const router = useRouter();
	const { uid } = router.query;
	const [userData, setUserData] = useState(null);
	const { currentUser, logout, loading } = useAuthContext();

	useEffect(() => {
		if (!loading) {
			if (!currentUser) {
		
				router.push("/login");
			} else if (currentUser.uid !== uid) {
				
			
				router.push(`/profile/${currentUser.uid}`);
			}
		}
	}, [currentUser, loading, uid, router]);

	useEffect(() => {
		const fetchData = async () => {
			if (uid) {
				try {
					const docRef = doc(db, "users", uid);
					const docSnap = await getDoc(docRef);

					if (docSnap.exists()) {
						setUserData(docSnap.data());
					} else {
						console.log("No such document!");
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		if (currentUser && currentUser.uid === uid) {
			fetchData();
		}
	}, [uid, currentUser]);

	if (loading || !userData) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{userData.name}</h1>
			<p>Age: {userData.age}</p>
			<div>
				{userData.photos &&
					userData.photos.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`User photo ${index + 1}`}
							width="200"
							height="200"
						/>
					))}
			</div>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default UserProfile;
