package br.ufg.inf.agendavacinacao.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;

import java.io.Serializable;

@Slf4j
@Data
@EqualsAndHashCode(of = "id")
@Entity
public class Vacina implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(nullable = false)
    private String titulo;

    @NonNull
    @Column(nullable = false)
    private String descricao;

    @NonNull
    @Column(nullable = false)
    private int doses;

    @NonNull
    @Column(nullable = false)
    private int periodicidade;

    @NonNull
    @Column(nullable = false)
    private int intervalo;

    public Vacina() {
    }
}
