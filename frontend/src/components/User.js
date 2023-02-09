import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from "axios";
import server from '../services/server';




const User = () => {

  const [setor, setSetor] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const [alergiasExibir, setAlergiasExibir] = useState([]);
  const [alergias, setAlergias] = useState([]);
  const [loading, setLoading] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  async function Register() {



    const response = await axios.post(`${server}/usuario`, {
      nome: nome,
      dataNascimento: dataNascimento,
      sexo: sexo,
      alergias: alergias,
      setor: setor,
      logradouro: logradouro,
      numero: numero,
      cidade: cidade,
      uf: uf
    })
    if (response.status >= 200 && response.status <= 300) {
      console.log(response.body);
      navigate('/');
    } else {
      console.log(response.body);
      console.log("ERRO");
    }


  }



  function getStyles(name, alergias, theme) {
    return {
      fontWeight:
        alergias.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleAlergias = (event) => {
    const {
      target: { value },
    } = event;
    setAlergias(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {

    const getAlergiasExibir = async () => {
      setLoading(true);

      let response = await axios.get(`${server}/alergia`)
      setLoading(false);
      console.log(response.data)
      return setAlergiasExibir(response.data);
    }

    getAlergiasExibir();


  }, [])


  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro de usuários
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="dataNascimento"
                //label="Data de nascimento"
                name="dataNascimento"
                value={dataNascimento}
                type="date"
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="sexo"
                  id="sexo"
                  label="sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                  <FormControlLabel value="O" control={<Radio />} label="Outros" />

                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Alergias</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="alergias"
                  multiple
                  value={alergias}
                  onChange={handleAlergias}
                  input={<OutlinedInput id="select-multiple-chip" label="Alergias" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {alergiasExibir.map((id, name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, alergiasExibir, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="logradouro"
                label="Logradouro"
                name="logradouro"
                autoComplete="logradouro"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                name="numero"
                label="Numero"
                type="number"
                id="numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="setor"
                label="Setor"
                name="setor"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                name="cidade"
                label="Cidade"
                id="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">UF</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="uf"
                  value={uf}
                  label="UF"
                  onChange={(e) => setUf(e.target.value)}
                >
                  <MenuItem value="AC">Acre</MenuItem>
                  <MenuItem value="AL">Alagoas</MenuItem>
                  <MenuItem value="AP">Amapá</MenuItem>
                  <MenuItem value="AM">Amazonas</MenuItem>
                  <MenuItem value="BA">Bahia</MenuItem>
                  <MenuItem value="CE">Ceará</MenuItem>
                  <MenuItem value="DF">Distrito Federal</MenuItem>
                  <MenuItem value="ES">Espírito Santo</MenuItem>
                  <MenuItem value="GO">Goiás</MenuItem>
                  <MenuItem value="MA">Maranhão</MenuItem>
                  <MenuItem value="MT">Mato Grosso</MenuItem>
                  <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                  <MenuItem value="MG">Minas Gerais</MenuItem>
                  <MenuItem value="PA">Pará</MenuItem>
                  <MenuItem value="PB">Paraíba</MenuItem>
                  <MenuItem value="PR">Paraná</MenuItem>
                  <MenuItem value="PE">Pernambuco</MenuItem>
                  <MenuItem value="PI">Piauí</MenuItem>
                  <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                  <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                  <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                  <MenuItem value="RO">Rondônia</MenuItem>
                  <MenuItem value="RR">Roraima</MenuItem>
                  <MenuItem value="SC">Santa Catarina</MenuItem>
                  <MenuItem value="SP">São Paulo</MenuItem>
                  <MenuItem value="SE">Sergipe</MenuItem>
                  <MenuItem value="TO">Tocantins</MenuItem>
                  <MenuItem value="99">Estrangeiro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => Register()}
          >
            "Cadastrar"
          </Button>

          {<Alert severity="error">{ }</Alert>}

        </Box>
      </Box>
    </Container>

  );
}
export default User 