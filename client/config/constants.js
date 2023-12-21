export const constants = {
	FIREBASE_API_KEY: "AIzaSyBvsPQCT1pTzIkxW3xcCKDQXCxZQzJTJ4s"
};

Object.entries(constants).forEach(([key, value]) => {
	if (typeof value === "undefined") throw new Error(`${key} not found!`);
});
