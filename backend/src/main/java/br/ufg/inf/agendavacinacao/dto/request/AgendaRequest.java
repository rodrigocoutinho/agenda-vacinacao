package br.ufg.inf.agendavacinacao.dto.request;

import br.ufg.inf.agendavacinacao.model.Situacao;
import br.ufg.inf.agendavacinacao.model.Usuario;
import br.ufg.inf.agendavacinacao.model.Vacina;
import lombok.Data;

import java.sql.Date;

@Data
public class AgendaRequest {
    private long id;

    private Vacina vacina;
    private Usuario usuario;
    private Date data;

    private Situacao situacao;
    private Date dataSituacao;
    private String observacoes;
}
