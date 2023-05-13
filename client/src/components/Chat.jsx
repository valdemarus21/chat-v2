import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

export const Chat = () => {
	const { search } = useLocation();
	const [params, setParams] = React.useState(null);
	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit('join', searchParams);
	}, [search]);

	useEffect(() => {
		socket.on('message', ({ data }) => {
			console.log(data);
		});
	}, []);
	return <></>;
};
