package br.ufg.inf.agendavacinacao.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;

import java.io.Serializable;

@Data
@EqualsAndHashCode(of = "id")
@Entity
public class Alergia implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name="usuario")
    private String nome;

    public Alergia(){

    };
}
