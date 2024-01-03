export const constants = {
	FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
};

Object.entries(constants).forEach(([key, value]) => {
	if (typeof value === "undefined") throw new Error(`${key} not found!`);
});
