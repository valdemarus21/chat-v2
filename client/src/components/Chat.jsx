import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import styles from '../styles/Chat.module.css'
const socket = io.connect('http://localhost:5000');

export const Chat = () => {
	const [state, setState] = React.useState([]);
	const { search } = useLocation();
	const [params, setParams] = React.useState(null);
	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit('join', searchParams);
	}, [search]);

	useEffect(() => {
		socket.on('message', ({ data }) => {
			setState((_state) => ([
                ..._state, 
                data
            ]))
		});
	}, []);
    console.log(state)
	return <></>;
};
