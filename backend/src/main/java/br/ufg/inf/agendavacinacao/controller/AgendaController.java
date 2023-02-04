package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.dto.request.AgendaRequest;
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
        Agenda agendaSalva = agendaRepository.save(agenda);
        return ResponseEntity.status(HttpStatus.CREATED).body(agendaSalva);
    }

    @PostMapping
    public ResponseEntity<Agenda> baixar(@PathVariable Long id, @RequestBody AgendaRequest agendaRequest) {
        Optional<Agenda> agendaSalva = agendaRepository.findById(id);
        if(agendaSalva.isPresent()){
            Agenda agendaAtualizada = agendaSalva.get();
            agendaAtualizada.setSituacao(agendaRequest.getSituacao());
            agendaAtualizada.setDataSituacao(agendaRequest.getDataSituacao());
            agendaAtualizada.setObservacoes(agendaRequest.getObservacoes());
            return new ResponseEntity<>(agendaRepository.save(agendaAtualizada), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> excluirAgenda(@PathVariable Long id) {
        agendaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
