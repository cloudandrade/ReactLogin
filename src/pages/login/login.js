/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const useStyles = makeStyles({
	padding: '15px',
	boxSizing: 'border-box',
	underline: {
		'&&&:before': {
			borderBottom: 'none',
		},
		'&&:after': {
			borderBottom: 'none',
		},
	},
});

export default function login(props) {
	const [isRegister, setIsRegister] = useState(false);
	const classes = useStyles();
	return (
		<div className="login-page">
			<div className="form">
				<form className="register-form">
					<TextField
						label="name"
						variant="outlined"
						InputProps={{ classes }}
					/>
					<input type="password" placeholder="password" />
					<input type="text" placeholder="email address" />
					<Button>create</Button>
					<p class="message">
						Already registered? <a href="#">Sign In</a>
					</p>
				</form>
				<form className="login-form">
					<input type="text" placeholder="username" />
					<TextField
						label="name"
						variant="filled"
						InputProps={{ classes }}
					/>
					<input type="password" placeholder="password" />
					<Button>login</Button>
					<p class="message">
						Not registered?{' '}
						<a onClick="">Create an account</a>
					</p>
				</form>
			</div>
		</div>
	);
}
