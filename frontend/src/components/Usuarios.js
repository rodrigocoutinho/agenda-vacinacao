import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import server from '../services/server';

const Usuarios = () => {
    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            width: 30,
        },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 200,
        },
        {
            field: 'dataNascimento',
            headerName: 'Dt. Nasc.',
            width: 100,
        },
        {
            field: 'sexo',
            headerName: 'Sexo',
            width: 30,
        },
        {
            field: 'alergias',
            headerName: 'Alergias',
            width: 200,
        },

        {
            field: 'logradouro',
            headerName: 'Logradouro',
        },
        {
            field: 'numero',
            headerName: 'N.',
            type: 'number',
            width: 30,
        },
        {
            field: 'setor',
            headerName: 'Setor',
        },
        {
            field: 'cidade',
            headerName: 'Cidade',
        },
        {
            field: 'uf',
            headerName: 'UF',
        },

    ];

    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [alergias, setAlergias] = useState([]);
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [setor, setSetor] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    let [vacinas, setVacinas] = useState([]);

    useEffect(() => {

        const getVacinas = async () => {
            setLoading(true);

            let response = await axios.get(`${server}/vacina`)
            setLoading(false);
            return setVacinas(response.data);
        }

        getVacinas();


    }, [])
    const linhas = vacinas.map(({ id, nome, dataNascimento, sexo, alergias, logradouro, numero, setor, cidade, uf }) => ({
        id: id,
        nome: nome,
        dataNascimento: dataNascimento,
        sexo: sexo,
        alergias: alergias,
        logradouro: logradouro,
        numero: numero,
        setor: setor,
        cidade: cidade,
        uf: uf
    }));
    return (
        <Container maxWidth="lg" >
            <Box>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={linhas}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
            </Box>
        </Container>
    )
}
export default Usuarios;