import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'

import './style.css';
import api from '../../services/api';

import heroesLogo from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            alert(`Seja bem-vindo ${response.data.name}`);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert(`Não foi possível relaizar o login. Tente novamente.`);
        }
    };

    return (
        <div className="logon-container">
            <section className="form">
            <img src={heroesLogo} alt="Be The Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Digite seu nome de usuário"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Entrar
                    </button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}