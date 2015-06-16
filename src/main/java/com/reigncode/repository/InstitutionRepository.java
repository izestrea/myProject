package com.reigncode.repository;

import com.reigncode.domain.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by user on 03.06.2015.
 */
public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    @Query("SELECT ins.institutionName FROM Institution ins")
    List<String> allInstitutions();

    Institution findByInstitutionName(String name);

}
