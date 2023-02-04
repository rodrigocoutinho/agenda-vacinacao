package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.model.Agenda;
import br.ufg.inf.agendavacinacao.model.Alergia;
import br.ufg.inf.agendavacinacao.model.Vacina;
import br.ufg.inf.agendavacinacao.repository.VacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacina")
public class VacinaController {
    @Autowired
    private VacinaRepository vacinaRepository;

    @GetMapping
    public List<Vacina> listarTodas() {
        return vacinaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Vacina> cadastrarAgenda(@RequestBody Vacina vacina) {
        Vacina vacinaSalva = vacinaRepository.save(vacina);
        return ResponseEntity.status(HttpStatus.CREATED).body(vacinaSalva);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> excluirAgenda(@PathVariable Long id) {
        vacinaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
