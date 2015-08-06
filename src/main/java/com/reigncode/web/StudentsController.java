package com.reigncode.web;

import com.reigncode.domain.Student;
import com.reigncode.repository.FacultateRepository;
import com.reigncode.repository.InstitutionRepository;
import com.reigncode.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


/**
 * Created by user on 03.06.2015.
 */
@RestController
@RequestMapping("/api")
public class StudentsController {

    @Autowired
    public StudentRepository studentRepository;
    // Student -> Institution
    @Autowired
    public InstitutionRepository institutionRepository;
    @Autowired
    public FacultateRepository facultateRepository;

    @RequestMapping(value = "/students", method = RequestMethod.GET)
    public Page<Student> getStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    // Student -> Institution
//    @RequestMapping(value = "/registerStudent/{inst_name}", method = RequestMethod.POST)
//    public void saveStudents(@RequestBody Student student, @PathVariable String inst_name){
//        student.setInstitution(institutionRepository.findByInstitutionName(inst_name));
//        studentRepository.save(student);
//    }
    // Student -> Facultate -> Institution
    @RequestMapping(value = "/registerStudent/{fac_name}/{inst_name}", method = RequestMethod.POST)
    public void saveStudents(@RequestBody Student student, @PathVariable String fac_name, @PathVariable String inst_name) {
        student.setFacultate(facultateRepository.findByNumeFacultate(fac_name));
//        System.out.println(fac_name);
        student.setInstitution(institutionRepository.findByInstitutionName(inst_name));
        studentRepository.save(student);
    }

    @RequestMapping(value = "/deleteStudent/{st_id}", method = RequestMethod.DELETE)
    public void deleteStudent(@PathVariable Long st_id) {
        studentRepository.delete(st_id);
    }

    @RequestMapping(value = "/updateStudent/{st_id}", method = RequestMethod.POST)
    public void updateStudent(@RequestBody Student student, @PathVariable Long st_id) {
        student.setId(st_id);
        studentRepository.save(student);
    }
}
