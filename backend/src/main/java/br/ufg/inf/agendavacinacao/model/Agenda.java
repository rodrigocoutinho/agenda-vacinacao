package br.ufg.inf.agendavacinacao.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.lang.NonNull;

import java.io.Serializable;
import java.sql.Date;

@Data
@Entity
public class Agenda implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Column(nullable = false)
    private Vacina vacina;

    @NonNull
    @Column(nullable = false)
    private Usuario usuario;

    @NonNull
    @Column(nullable = false)
    private Date data;

    @NonNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Situacao situacao;

    private Date dataSituacao;

    private String observacoes;

    public Agenda(){

    };
}
