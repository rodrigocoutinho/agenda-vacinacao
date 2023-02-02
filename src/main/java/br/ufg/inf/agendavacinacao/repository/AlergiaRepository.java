package br.ufg.inf.agendavacinacao.repository;

import br.ufg.inf.agendavacinacao.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlergiaRepository extends JpaRepository<Agenda, Long> {

}
