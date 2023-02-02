package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.model.Agenda;
import br.ufg.inf.agendavacinacao.repository.VacinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacina")
public class VacinaController {
    @Autowired
    private VacinaRepository vacinaRepository;

    @GetMapping
    public List<Agenda> listarTodas() {
        return vacinaRepository.findAll();
    }

}
