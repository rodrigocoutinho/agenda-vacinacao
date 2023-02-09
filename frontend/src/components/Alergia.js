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

const Alergia = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nome: data.get('nome'),
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
      field: 'nome',
      headerName: 'nome',
      width: 200,
    },
    
  ];

  const [nome, setNome] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let [Alergias, setAlergias] = useState([]);

  useEffect(() => {

    const getAlergias = async () => {
      setLoading(true);

      let response = await axios.get(`${server}/alergia`)
      setLoading(false);
      console.log(response.data)
      return setAlergias(response.data);
    }

    getAlergias();


  }, [])
  const linhas = Alergias.map(({ id, nome }) => ({
    id: id,
    nome: nome,
    key: id
  }));

  async function Cadastrar() {
    const response = await axios.post(`${server}/alergia`, {
      nome: nome,
    })
    if (response.status >= 200 && response.status <= 300) {
      
        Navegar();
    } else {
      console.log("ERRO");
    }
  }

  function Navegar() {
    setTimeout(() => {  console.log("Cadastrada com sucesso!"); }, 5000);
    window.location.reload(false);
    navigate('/alergias');
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
              Cadastro de Alergias
            </Typography>
          </Grid>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => Cadastrar()}
          >
            Cadastrar Alergia
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
export default Alergia