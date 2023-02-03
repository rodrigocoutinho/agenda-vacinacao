package br.ufg.inf.agendavacinacao.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Date;

@Data
public class Agenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Vacina vacina;
    private Usuario usuario;
    private Date data;

    @Enumerated(EnumType.STRING)
    private Situacao situacao;
    private Date dataSituacao;
}
