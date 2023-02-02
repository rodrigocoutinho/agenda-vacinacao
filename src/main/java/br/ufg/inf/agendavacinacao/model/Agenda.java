package br.ufg.inf.agendavacinacao.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Date;

@Data
@Entity
@EqualsAndHashCode(of = "id")
public class Agenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Embedded
    private Vacina vacina;

    @Embedded
    private Usuario usuario;

    private Date data;

    @Enumerated(EnumType.STRING)
    private Situacao situacao;
    private Date dataSituacao;
}
