package br.ufg.inf.agendavacinacao.repository;

import br.ufg.inf.agendavacinacao.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Agenda, Long> {
}
