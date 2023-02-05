package br.ufg.inf.agendavacinacao.dto.request;

import br.ufg.inf.agendavacinacao.model.Situacao;
import br.ufg.inf.agendavacinacao.model.Usuario;
import br.ufg.inf.agendavacinacao.model.Vacina;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.sql.Date;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AgendaRequest {
    private Vacina vacina;
    private Usuario usuario;
    private Date data;
    
    @JsonProperty("situacao")
    private Situacao situacao;

    @JsonProperty("dataSituacao")
    private Date dataSituacao;

    @JsonProperty("observecoes")
    private String observacoes;
}
