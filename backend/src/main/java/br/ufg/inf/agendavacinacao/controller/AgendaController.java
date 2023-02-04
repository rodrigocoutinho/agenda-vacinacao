package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.model.Agenda;
import br.ufg.inf.agendavacinacao.model.Usuario;
import br.ufg.inf.agendavacinacao.repository.AgendaRepository;
import br.ufg.inf.agendavacinacao.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/agenda")
public class AgendaController {
    @Autowired
    private AgendaRepository agendaRepository;

    @GetMapping
    public List<Agenda> findAll() {
        return agendaRepository.findAll();
    }


    @PostMapping
    public ResponseEntity<Agenda> cadastrarAgenda(@RequestBody Agenda agenda) {
        Agenda AgendaSalva = agendaRepository.save(agenda);
        return ResponseEntity.status(HttpStatus.CREATED).body(AgendaSalva);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> excluirAgenda(@PathVariable Long id) {
        agendaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
