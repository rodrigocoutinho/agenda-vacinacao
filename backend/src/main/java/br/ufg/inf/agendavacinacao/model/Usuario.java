package br.ufg.inf.agendavacinacao.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CompositeType;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Data
@EqualsAndHashCode(of = "id")
@Entity
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Date dataNascimento;
    private String sexo;
    private String logradouro;
    private int numero;
    private String setor;
    private String cidade;
    private String uf;


    @ManyToMany
    @JoinColumn(name="alergia")
    private List<Alergia> alergias;
}
