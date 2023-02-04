package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.model.Agenda;
import br.ufg.inf.agendavacinacao.model.Alergia;
import br.ufg.inf.agendavacinacao.repository.AlergiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/alergia")
public class AlergiaController {
    @Autowired
    private AlergiaRepository alergiaRepository;

    @GetMapping
    public List<Alergia> listarTodas() {
        return alergiaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Alergia> cadastrarAgenda(@RequestBody Alergia alergia) {
        Alergia alergiaSalva = alergiaRepository.save(alergia);
        return ResponseEntity.status(HttpStatus.CREATED).body(alergiaSalva);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> excluirAgenda(@PathVariable Long id) {
        alergiaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
