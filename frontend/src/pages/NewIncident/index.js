import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import heroesLogo from '../../assets/logo.svg';

import './style.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            const response = await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            alert(`O ID do novo caso é: ${response.data.id}`);
            history.push('/profile');
        } catch (err) {
            alert('Não foi possível cadastrar o novo caso. Tente novamente.');
        }
        
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={heroesLogo} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamento para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                            Retornar para a home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <Link to="/profile">
                        <button className="cancel-button">Cancelar</button>
                    </Link>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}