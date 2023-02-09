import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import server from '../services/server';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Agenda de agendação
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const Agenda = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            id: data.get('id'),
            data: data.get('data'),
            hora: data.get('hora'),
            vacina: data.get('vacina'),
            usuario: data.get('usuario'),
            situacao: data.get('situacao'),
            dataSituacao: data.get('dataSituacao'),
            observacoes: data.get('observacoes'),
        });
    };

    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            width: 30,
        },
        {
            field: 'data',
            headerName: 'Data',
            //type: 'date',
            width: 100,
        },
        {
            field: 'hora',
            headerName: 'Hora',
            width: 60,
        },
        {
            field: 'vacina',
            headerName: 'Vacina',
            width: 60,
        },
        {
            field: 'usuario',
            headerName: 'Usuario',
            width: 150,
        },
        {
            field: 'situacao',
            headerName: 'Situação',
        },

        {
            dataSituacao: 'dataSituacao',
            headerName: 'Data da Situação',
            //type: 'date',
            width: 150,
        },
        {
            field: 'observacoes',
            headerName: 'Observações',
            width: 250,
        },

    ];

    const [id, setId] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [vacina, setVacina] = useState('');
    const [usuario, setUsuario] = useState('');
    const [situacao, setSituacao] = useState('');
    const [dataSituacao, setDataSituacao] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [vacinas, setVacinas] = useState([]);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    let [agendas, setAgendas] = useState([]);

    useEffect(() => {

        const getAgendas = async () => {
            setLoading(true);

            let response = await axios.get(`${server}/agenda`)
            setLoading(false);
            return setAgendas(response.data);
        }

        getAgendas();


    }, [])
    const linhas = agendas.map(({ id, data, hora, vacina, usuario, situacao, dataSituacao, observacoes }) => ({
        id: id,
        data: data,
        hora: hora,
        vacina: vacina,
        usuario: usuario,
        situacao: situacao,
        dataSituacao: dataSituacao,
        observacoes: observacoes,
        key: id
    }));

    useEffect(() => {

        const getUsuarios = async () => {
            setLoading(true);

            let response = await axios.get(`${server}/usuario`)
            setLoading(false);
            return setUsuarios(response.data);
        }

        getUsuarios();


    }, [])

    useEffect(() => {

        const getVacinas = async () => {
            setLoading(true);

            let response = await axios.get(`${server}/vacina`)
            setLoading(false);
            return setVacinas(response.data);
        }

        getVacinas();


    }, [])

    async function Cadastrar() {
        const response = await axios.post(`${server}/agenda`, {
            data: data,
            hora: hora,
            vacina: vacina,
            usuario: usuario,
            situacao: situacao,
            dataSituacao: dataSituacao,
            observacoes: observacoes
        })
        if (response.status >= 200 && response.status <= 300) {

            Navegar();
        } else {
            console.log("ERRO");
        }
    }

    function Navegar() {
        setTimeout(() => { console.log("Cadastrada com sucesso!"); }, 5000);
        window.location.reload(false);
        navigate('/agenda');
    }

    return (
        <ThemeProvider theme={theme}>

            <Container maxWidth="md" >

                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid>
                        <Typography component="h1" variant="h5">
                            Cadastro de agendas
                        </Typography>
                    </Grid>
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                    <FormLabel id="demo-row-radio-buttons-group-label">Data do agendamento</FormLabel>
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="data"
                        //label="Data"
                        name="data"
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="hora"
                        label="Hora"
                        name="hora"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                    />

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Vacina</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                required
                                fullWidth
                                id="vacina"
                                label="Vacina"
                                name="vacina"
                                value={vacina}
                                onChange={(e) => setVacina(e.target.value)}
                            >
                                {vacinas.map((data) => (
                                    <MenuItem key={data.id} value={data.titulo}>{data.titulo}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                required
                                fullWidth
                                id="usuario"
                                label="Usuario"
                                name="usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            >
                                {usuarios.map((data) => (
                                    <MenuItem key={data.id} value={data.nome}>{data.nome}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Situação</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                required
                                fullWidth
                                id="situacao"
                                label="Situacao"
                                name="situacao"
                                value={situacao}
                                onChange={(e) => setSituacao(e.target.value)}
                            >
                                <MenuItem value="REALIZADA">REALIZADA</MenuItem>
                                <MenuItem value="AGENDADA">AGENDADA</MenuItem>
                                <MenuItem value="CANCELADA">CANCELADA</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <FormLabel id="demo-row-radio-buttons-group-label">Data da situação</FormLabel>
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="dataSituacao"
                        //label="Data da situação"
                        name="dataSituacao"
                        type="date"
                        value={dataSituacao}
                        onChange={(e) => setDataSituacao(e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="observacoes"
                        label="Observações"
                        name="observacoes"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => Cadastrar()}
                    >
                        Cadastrar Agenda
                    </Button>


                </Box>

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
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
export default Agenda