package com.reigncode.repository;

import com.reigncode.domain.Facultate;
import com.reigncode.domain.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by user on 09.07.2015.
 */
public interface FacultateRepository extends JpaRepository<Facultate, Long> {
    @Query("SELECT fac.numeFacultate FROM Facultate fac")
    List<String> toateFacultatile();
    Facultate findByNumeFacultate(String name);
    List<Facultate> findByInstitution(Institution institution);
}
