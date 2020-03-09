import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './styles.css';

export default function login(props) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isRegister, setIsRegister] = useState(false);

	return (
		<div className="login-page">
			<div className="form">
				<form className="register-form">
					<TextField label="name" variant="outlined" />
					<input type="password" placeholder="password" />
					<input type="text" placeholder="email address" />
					<Button>create</Button>
					<p class="message">
						Already registered? <a href="#">Sign In</a>
					</p>
				</form>
				<form className="login-form">
					<input type="text" placeholder="username" />
					<input type="password" placeholder="password" />
					<Button>login</Button>
					<p class="message">
						Not registered? <a onClick="">Create an account</a>
					</p>
				</form>
			</div>
		</div>
	);
}
