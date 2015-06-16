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
    private Page<Student> getStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    @RequestMapping(value = "/registerStudent/{inst_name}", method = RequestMethod.POST)
    private void saveStudents(@RequestBody Student student, @PathVariable String inst_name){
        student.setInstitution(institutionRepository.findByInstitutionName(inst_name));
        studentRepository.save(student);
    }

    @RequestMapping(value = "/deleteStudent/{st_id}", method = RequestMethod.DELETE)
    private void deleteStudent(@PathVariable Long st_id){
        studentRepository.delete(st_id);
    }

    @RequestMapping(value = "/updateStudent/{st_id}", method = RequestMethod.POST)
    private void updateStudent(@RequestBody Student student, @PathVariable Long st_id){
        student.setId(st_id);
        studentRepository.save(student);
    }
}
