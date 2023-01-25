export const dateToString = (date: number) => {
	const messageDate = new Date(date * 1000);
	return [messageDate.getHours(), messageDate.getMinutes()]
		.map(i => (i < 10 ? '0' + i : i))
		.join(':');
};
