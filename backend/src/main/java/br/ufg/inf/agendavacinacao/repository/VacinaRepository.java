package br.ufg.inf.agendavacinacao.repository;

import br.ufg.inf.agendavacinacao.model.Agenda;
import br.ufg.inf.agendavacinacao.model.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacinaRepository extends JpaRepository<Vacina, Long> {
}
