import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import styles from '../styles/Chat.module.css';
import icon from '../img/emoji.svg';
import EmojiPicker from 'emoji-picker-react';
import Messages from './Messages';
const socket = io.connect('http://localhost:5000');

export const Chat = () => {
	const [state, setState] = React.useState([]);
	const { search } = useLocation();
	const [params, setParams] = React.useState({ room: '', user: '' });
	const [users, setUsers] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [isOpen, setIsOpen] = React.useState(false);
	const handleChange = ({ target: { value } }) => {
		setMessage(value);
	};
	const onEmojiClick = ({ emoji }) => {
		setMessage(`${message} ${emoji}`);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!message) return;

		socket.emit('sendMessage', { message, params });
		setMessage('');
	};

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit('join', searchParams);
	}, [search]);

	useEffect(() => {
		socket.on('message', ({ data }) => {
			setState((_state) => [..._state, data]);
		});
	}, []);
	useEffect(() => {
		socket.on('joinRoom', ({ data: { users } }) => {
			setUsers(users.length);
		});
	});
	console.log(state);
	const leftRoom = () => {};
	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<div className={styles.title}>{params.room}</div>
				<div className={styles.users}>{users} users in this room</div>
				<button className={styles.left} onClick={leftRoom}>
					EXIT
				</button>
			</div>
			<div className={styles.messages}>
				<Messages messages={state} name={params.name} />
			</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.input}>
					<input
						value={message}
						type="text"
						name="name"
						required
						onChange={handleChange}
						placeholder="message"
						autoComplete="off"
					/>
				</div>
				<div className={styles.emoji}>
					<img src={icon} alt="emoji-icon" onClick={() => setIsOpen(!isOpen)} />
					{isOpen && (
						<div className={styles.emojies}>
							<EmojiPicker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div>
				<div className={styles.button}>
					<input type="submit" value="Send message" onSubmit={handleSubmit} />
				</div>
			</form>
		</div>
	);
};
