import React from 'react';
import styles from '../styles/Main.module.css';
import { Link } from 'react-router-dom';
export const Main = () => {
	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				<h1 className={styles.heading}>Join</h1>
				<form className={styles.form}>
					<div className={styles.group}>
						<input
							type="text"
							name="username"
							required
							className={styles.input}
							onChange={() => {}}
							placeholder="username..."
						/>
					</div>
					<div className={styles.group}>
						<input
							type="text"
							name="room"
							required
							className={styles.input}
							onChange={() => {}}
							placeholder="room"
						/>
					</div>
					<Link to={`/chat?name=`}>
						<button
							type="submit"
							className={styles.button}
							style={{ padding: 15, borderRadius: 15 }}>
							SIGN IN
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
};
