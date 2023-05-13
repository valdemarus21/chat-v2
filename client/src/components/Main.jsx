import React from 'react';
import styles from '../styles/Main.module.css';
import { Link } from 'react-router-dom';

const FIELDS = {
	NAME: 'name',
	ROOM: 'room',
};
export const Main = () => {
	const { NAME, ROOM } = FIELDS;
	const [values, setValues] = React.useState({ [NAME]: '', [ROOM]: '' });

	const handleClick = (event) => {
		const isDisabled = Object.values(values).some((value) => !value);
        if(isDisabled) event.preventDefault()
	};
	const handleChange = ({ target: { value, name } }) => {
		setValues({ ...values, [name]: value });
		console.log(values);
	};
	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				<h1 className={styles.heading}>Join</h1>
				<form className={styles.form}>
					<div className={styles.group}>
						<input
							value={values[NAME]}
							type="text"
							name="name"
							required
							className={styles.input}
							onChange={handleChange}
							placeholder="username..."
							autoComplete="off"
						/>
					</div>
					<div className={styles.group}>
						<input
							value={values[ROOM]}
							type="text"
							name="room"
							required
							className={styles.input}
							onChange={handleChange}
							placeholder="room"
							autoComplete="off"
						/>
					</div>
					<Link
						to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
						className={styles.group}
						onClick={handleClick}>
						<button type="submit" className={styles.button}>
							SIGN IN
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
};
