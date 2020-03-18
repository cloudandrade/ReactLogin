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
	//--------------error states
	const [emailErr, setEmailErr] = useState('');
	const [passErr, setPassErr] = useState('');
	const [pass2Err, setPass2Err] = useState('');

	let errors = [];
	const classes = useStyles();

	//abre toast
	const handleOpen = () => {
		setOpen(true);
	};
	//fecha toast
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	//responsavel pela troca de pagina de login e cadastro
	function handleChangeInternalPage() {
		isRegister === false
			? setIsRegister(true)
			: setIsRegister(false);
	}
	//---------------------------------------------------
	//responsavel pelo cadastro
	async function handleCreateAccount(e) {
		e.preventDefault();
		let roles = ['user'];
		const usuario = { name, email, password, roles };
		errors = [];
		await validateFields();
		if (errors.length === 0) {
			try {
				let response = await api.post(
					'/auth/signup',
					usuario
				);
				if (response.status === 200) {
					handleChangeInternalPage();
					handleOpen();
				}
			} catch (error) {
				console.log('Erro no console' + error);
			}
		}
		//do nothing
	}
	//-----------------------------------------------------
	//responsavel por login
	function handleLogin(e) {
		e.preventDefault();
	}
	//------------------------------------------------------
	//Função validar os campos e verificar se está de acordo com as regras do sistema
	function validateFields() {
		let passlimit = 4;
		setPassErr('');
		setPass2Err('');
		setEmailErr('');

		if (password.length < passlimit) {
			let error = {};
			error.input = 'password';
			error.msg = 'password must be greater than ' + passlimit;
			setPassErr(error.msg);
			errors.push(error);
		}

		if (password2 !== password) {
			let error = {};
			error.input = 'password2';
			error.msg = 'passwords are diferent, must be equals';
			setPass2Err(error.msg);
			errors.push(error);
		}

		if (!email.includes('@')) {
			let error = {};
			error.input = 'email';
			error.msg = 'must be a valid mail';
			setEmailErr(error.msg);
			errors.push(error);
		}
	}

	//------------------------------------------------------------------------------
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
							error={
								emailErr.length !== 0 ? true : false
							}
							helperText={
								emailErr.length !== 0
									? emailErr
									: null
							}
							onChange={e => setEmail(e.target.value)}
							InputProps={{ classes }}
							style={{
								marginBottom: 5,
							}}
						/>

						<TextField
							fullWidth="true"
							error={
								passErr.length !== 0 ? true : false
							}
							label="Senha"
							helperText={
								passErr.length !== 0 ? passErr : null
							}
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
							error={
								pass2Err.length !== 0 ? true : false
							}
							helperText={
								pass2Err.length !== 0
									? pass2Err
									: null
							}
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
