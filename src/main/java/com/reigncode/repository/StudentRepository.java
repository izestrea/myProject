package com.reigncode.repository;

import com.reigncode.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by user on 03.06.2015.
 */
public interface StudentRepository extends JpaRepository<Student, Long>{

}
