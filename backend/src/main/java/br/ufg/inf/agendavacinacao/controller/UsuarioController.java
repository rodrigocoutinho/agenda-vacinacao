package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.model.Usuario;
import br.ufg.inf.agendavacinacao.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }


    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> temporaryData = usuarioRepository.findById(id);

        if(temporaryData.isPresent()) {
            Usuario _usuario = temporaryData.get();
            _usuario.setNome(usuario.getNome());
            _usuario.setDataNascimento(usuario.getDataNascimento());
            _usuario.setSexo(usuario.getSexo());
            _usuario.setLogradouro(usuario.getLogradouro());
            _usuario.setNumero(usuario.getNumero());
            _usuario.setSetor(usuario.getSetor());
            _usuario.setCidade(usuario.getCidade());
            _usuario.setUf(usuario.getUf());
            return new ResponseEntity<>(usuarioRepository.save(_usuario), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

