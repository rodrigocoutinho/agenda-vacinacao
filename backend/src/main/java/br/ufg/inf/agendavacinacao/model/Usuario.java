package br.ufg.inf.agendavacinacao.model;

import br.ufg.inf.agendavacinacao.dto.request.AlergiaRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.lang.NonNull;

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

    @NonNull
    @Column( nullable = false )
    private String nome;

    @NonNull
    @Column( nullable = false )
    private Date dataNascimento;

    @NonNull
    @Column( nullable = false )
    private String sexo;

    @NonNull
    @Column(nullable = false)
    private String logradouro;

    private int numero;

    @NonNull
    @Column(nullable = false)
    private String setor;

    @NonNull
    @Column(nullable = false)
    private String cidade;

    @NonNull
    @Column(nullable = false)
    private String uf;

    @JoinColumn(name="alergia")
    private List<Alergia> alergias;

    public Usuario() {
    }
}
