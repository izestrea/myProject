package com.reigncode.domain;

import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.util.Date;

/**
 * Created by user on 03.06.2015.
 */
@Entity
@Table(name = "students")
public class Student  {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern ="dd.MM.yyyy" )
    private Date birthday;
    private Long yearOfStudy;

    @ManyToOne
    @JoinColumn(name = "inst_id")
    private Institution institution;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }


    public Date getBirthday() {
        return birthday;
    }

    public Long getYearOfStudy() {
        return yearOfStudy;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public void setYearOfStudy(Long yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {

        return id;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }
}
