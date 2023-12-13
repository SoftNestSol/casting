import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MemberPage = () => {
	const [members, setMembers] = useState([]);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		fetch("http://localhost:4000/getMembers", {
			method: "GET",
			credentials: "include"
		})
			.then((res) => res.json())
			.then((data) => {
				setMembers(data);
			});
	}, []);

	const member = members.find((m) => m.id.toString() === id);

	if (!member) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Link href="/dashboard/member">asdasd</Link>
			<h1>Member Page</h1>
			<p>{member.name}</p>
			<p>{member.age}</p>
		</div>
	);
};

export default MemberPage;
