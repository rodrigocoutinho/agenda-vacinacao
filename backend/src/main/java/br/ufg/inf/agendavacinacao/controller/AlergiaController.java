package br.ufg.inf.agendavacinacao.controller;

import br.ufg.inf.agendavacinacao.model.Alergia;
import br.ufg.inf.agendavacinacao.repository.AlergiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/alergia")
public class AlergiaController {
    @Autowired
    private AlergiaRepository alergiaRepository;

    @GetMapping("/")
    public List<Alergia> listarTodas() {
        return alergiaRepository.findAll();
    }

}
