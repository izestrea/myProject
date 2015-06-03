package com.reigncode.repository;

import com.reigncode.domain.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by user on 03.06.2015.
 */
public interface InstitutionRepository extends JpaRepository<Institution, Long> {
}
