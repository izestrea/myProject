package com.reigncode.web;

import com.reigncode.domain.Institution;
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
public class InstitutionsController {

    @Autowired
    private InstitutionRepository institutionRepository;
    @Autowired
    private StudentRepository studentRepository;

    @RequestMapping(value = "/institutions", method = RequestMethod.GET)
    public List<String> getInstitutions(){
        return institutionRepository.allInstitutions();
    }

    @RequestMapping(value = "/institutionView", method = RequestMethod.GET)
    public Page<Institution> getAllInstitutions(Pageable pageable) {
        return institutionRepository.findAll(pageable);
    }

    @RequestMapping(value = "/registerInstitution", method = RequestMethod.POST)
    public void saveInstitutions(@RequestBody Institution institution){
        institutionRepository.save(institution);
    }

    @RequestMapping(value = "/deleteInstitution/{inst_id}", method = RequestMethod.DELETE)
    public void deleteInstitution(@PathVariable Long inst_id){
        List<Student> stInst = studentRepository.findByInstitution(institutionRepository.findOne(inst_id));
        studentRepository.delete(stInst);
        institutionRepository.delete(inst_id);
    }


}
