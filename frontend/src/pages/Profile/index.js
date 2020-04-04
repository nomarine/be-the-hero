import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import heroesLogo from '../../assets/logo.svg'

import './style.css';

export default function Profile() {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profiles', {
            headers: {
             Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
       try { 
           api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Não foi possível deletar o caso.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={heroesLogo} alt="Be the Hero"/>
                <span>Bem-vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button"><FiTrash2 size={18} color="#a8a8b3" onClick={() => handleDeleteIncident(incident.id)}/></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}