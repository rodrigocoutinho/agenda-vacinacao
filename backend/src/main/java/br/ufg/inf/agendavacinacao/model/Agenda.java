package br.ufg.inf.agendavacinacao.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

@Data
@Entity
public class Agenda implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Vacina vacina;

    @ManyToOne
    private Usuario usuario;
    private Date data;

    @Enumerated(EnumType.STRING)
    private Situacao situacao;
    private Date dataSituacao;
    private String observacoes;
}
