/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import api from '../../services/api-service';
import MuiAlert from '@material-ui/lab/Alert';
import {
	Button,
	TextField,
	Link,
	Typography,
	Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const useStyles = makeStyles({
	underline: {
		'&&&:before': {
			borderBottom: 'none',
		},
		'&&:after': {
			borderBottom: 'none',
		},
	},
});

function Alert(props) {
	return <MuiAlert variant="filled" {...props} />;
}

export default function login(props) {
	const [isRegister, setIsRegister] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [password2, setPassword2] = useState();
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	let errors = [];

	function handleChangeInternalPage() {
		isRegister === false
			? setIsRegister(true)
			: setIsRegister(false);
	}

	async function handleCreateAccount(e) {
		e.preventDefault();
		let roles = ['user'];
		const usuario = { name, email, password, roles };
		await validateFields();
		if (errors.length === 0) {
			let response = await api.post('/auth/signup', usuario);
			if (response.status === 200) {
				handleChangeInternalPage();
				handleOpen();
			}
		}
	}

	function handleLogin(e) {
		e.preventDefault();
	}

	function validateFields() {
		let passlimit = 4;

		if (password.length < passlimit) {
			let error = {};
			error.input = 'password';
			error.msg = 'password must be greater than ' + passlimit;
			errors.push(error);
		}

		if (password2 !== password) {
			let error = {};
			error.input = 'password2';
			error.msg = 'passwords are diferent, must be equals';
			errors.push(error);
		}

		if (!email.includes('@')) {
			let error = {};
			error.input = 'email';
			error.msg = 'must be a valid mail';
			errors.push(error);
		}
	}

	return (
		<div className="login-page">
			<Snackbar
				open={open}
				style={{
					position: 'relative',
					marginTop: 0,
					width: '100%',
				}}
				autoHideDuration={2000000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success">
					Usuário criado com sucesso!
				</Alert>
			</Snackbar>

			<div className="form">
				{isRegister === false ? (
					<form
						id="login"
						className="login-form"
						onSubmit={() => handleLogin}
					>
						<TextField
							fullWidth="true"
							label="email"
							variant="filled"
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>

						<TextField
							fullWidth="true"
							label="Senha"
							type="password"
							variant="filled"
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>
						<Button type="submit">login</Button>
						<Typography className={classes.root}>
							<p class="message">
								Não é Cadastrado?
								<Link
									href="#"
									onClick={e =>
										handleChangeInternalPage()
									}
								>
									Realizar Cadastro
								</Link>
							</p>
						</Typography>
					</form>
				) : (
					<form
						id="register"
						className="login-form"
						onSubmit={handleCreateAccount}
					>
						<TextField
							fullWidth="true"
							label="Nome Completo"
							variant="filled"
							onChange={e => setName(e.target.value)}
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>

						<TextField
							fullWidth="true"
							label="email"
							variant="filled"
							onChange={e => setEmail(e.target.value)}
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>

						<TextField
							fullWidth="true"
							label="Senha"
							type="password"
							variant="filled"
							onChange={e =>
								setPassword(e.target.value)
							}
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>
						<TextField
							fullWidth="true"
							label="Confirmação de Senha"
							type="password"
							variant="filled"
							onChange={e =>
								setPassword2(e.target.value)
							}
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>
						<Button type="submit">Criar Conta</Button>
						<Typography className={classes.root}>
							<p class="message">
								Já Cadastrado?
								<Link
									href="#"
									onClick={e =>
										handleChangeInternalPage()
									}
								>
									Fazer Login
								</Link>
							</p>
						</Typography>
					</form>
				)}
			</div>
		</div>
	);
}
