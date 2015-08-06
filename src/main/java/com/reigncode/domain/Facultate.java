package com.reigncode.domain;

import javax.persistence.*;

/**
 * Created by user on 09.07.2015.
 */
@Entity
@Table(name = "facultate")
public class Facultate {
    @Id
    @GeneratedValue
    private Long id;
    private String numeFacultate;

    @ManyToOne
    @JoinColumn(name = "inst_id")
    private Institution institution;

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeFacultate() {
        return numeFacultate;
    }

    public void setNumeFacultate(String numeFacultate) {
        this.numeFacultate = numeFacultate;
    }
}
