package br.ufg.inf.agendavacinacao.repository;

import br.ufg.inf.agendavacinacao.model.Agenda;
import br.ufg.inf.agendavacinacao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
