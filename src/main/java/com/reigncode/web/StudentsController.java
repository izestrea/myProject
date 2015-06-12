package com.reigncode.web;

import com.reigncode.domain.Student;
import com.reigncode.repository.InstitutionRepository;
import com.reigncode.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by user on 03.06.2015.
 */
@RestController
@RequestMapping("/api")
public class StudentsController {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private InstitutionRepository institutionRepository;

    @RequestMapping(value = "/students", method = RequestMethod.GET)
    public Page<Student> getStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    @RequestMapping(value = "/registerStudent/{inst_id}", method = RequestMethod.POST)
    public void saveStudents(@RequestBody Student student, @PathVariable Long inst_id){
        student.setInstitution(institutionRepository.findOne(inst_id));
        studentRepository.save(student);
    }

    @RequestMapping(value = "/deleteStudent/{st_id}", method = RequestMethod.DELETE)
    public void deleteStudent(@PathVariable Long st_id){
        studentRepository.delete(st_id);
    }
}
