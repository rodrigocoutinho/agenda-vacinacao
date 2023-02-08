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
import server from '../services/server';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Agenda de vacinação
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Vacina = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
      field: 'titulo',
      headerName: 'Titulo',
      width: 200,
    },
    {
      field: 'descricao',
      headerName: 'Descricao',
      width: 250,
    },
    {
      field: 'doses',
      headerName: 'Doses',
      type: 'number',
      width: 60,
    },
    {
      field: 'periodicidade',
      headerName: 'Periodicidade',
    },

    {
      field: 'intervalo',
      headerName: 'Intervalo',
      type: 'number',
    },
    
  ];

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [doses, setDoses] = useState('');
  const [periodicidade, setPeriodicidade] = useState('');
  const [intervalo, setIntervalo] = useState('');
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
  const linhas = vacinas.map(({ idRelatorio, nome, id, idLeito, co2, ruido, luminosidade, temperatura, tvoc, umidade }) => ({
    nome: nome,
    id: idRelatorio,
    idLeito: idLeito,
    co2: co2,
    ruidoSonoro: ruido,
    luminosidade: luminosidade,
    temperatura: temperatura,
    tvoc: tvoc,
    umidade: umidade,
    key: idRelatorio
  }));

  async function Cadastrar() {
    const response = await axios.post(`${server}/vacina`, {
      titulo: titulo,
      descricao: descricao,
      doses: doses,
      periodidicdade: periodicidade,
      intervalo: intervalo
    })
    if (response.status >= 200 && response.status <= 300) {
      
      navigate('/vacina');
    } else {
      console.log("ERRO");
    }
  }

  function Navegar() {
    navigate('/vacina');
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
              Cadastro de vacinas
            </Typography>
          </Grid>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="titulo"
            label="Titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <TextField
            variant="standard"
            margin="descricao"
            required
            fullWidth
            id="descricao"
            label="Descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="doses"
            label="Doses"
            name="doses"
            type="number"
            value={doses}
            onChange={(e) => setDoses(e.target.value)}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="periodicidade"
            label="Periodicidade"
            name="periodicidade"
            type="number"
            value={periodicidade}
            onChange={(e) => setPeriodicidade(e.target.value)}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="intervalo"
            label="Intervalo"
            name="intervalo"
            type="number"
            value={intervalo}
            onChange={(e) => setIntervalo(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => Cadastrar()}
          >
            Cadastrar Vacina
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
export default Vacina