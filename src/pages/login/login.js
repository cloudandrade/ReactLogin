/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import {
	Button,
	TextField,
	Link,
	Typography,
	Form,
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

export default function login(props) {
	const [isRegister, setIsRegister] = useState(false);
	const classes = useStyles();

	function handleChangeInternalPage() {
		console.log(isRegister);
		isRegister === false
			? setIsRegister(true)
			: setIsRegister(false);
	}

	function handleCreateAccount(e) {
		e.preventDefault();
		console.log('criou conta');
	}

	function handleLogin(e) {
		e.preventDefault();
		console.log('fez login');
	}

	const submit = e => {
		e.preventDefault();
	};

	return (
		<div className="login-page">
			<div className="form">
				{isRegister === false ? (
					<form
						className="login-form"
						onSubmit={handleLogin}
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
						className="login-form"
						onSubmit={handleCreateAccount}
					>
						<TextField
							fullWidth="true"
							label="Nome Completo"
							variant="filled"
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>

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
						<TextField
							fullWidth="true"
							label="Confirmação de Senha"
							type="password"
							variant="filled"
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
