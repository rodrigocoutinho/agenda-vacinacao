package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.model.Agenda;
import br.ufg.inf.agendavacinacao.repository.AgendaRepository;
import br.ufg.inf.agendavacinacao.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/agenda")
public class AgendaController {
    @Autowired
    private AgendaRepository agendaRepository;

    @GetMapping("/")
    public List<Agenda> findAll() {
        return agendaRepository.findAll();
    }


}
