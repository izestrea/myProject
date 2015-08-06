package com.reigncode.web;

import com.reigncode.domain.Facultate;
import com.reigncode.domain.Student;
import com.reigncode.repository.FacultateRepository;
import com.reigncode.repository.InstitutionRepository;
import com.reigncode.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by user on 09.07.2015.
 */
@RestController
@RequestMapping("/api")
public class FacultateController  {
    @Autowired
    public InstitutionRepository institutionRepository;
    @Autowired
    public FacultateRepository facultateRepository;
    @Autowired
    public StudentRepository studentRepository;
    @RequestMapping(value = "/facultate", method = RequestMethod.GET)
    public List<String> getFacultate(){
        return facultateRepository.toateFacultatile();
    }
    @RequestMapping(value = "/facultateView", method = RequestMethod.GET)
    public Page<Facultate> getAllFacultate (Pageable pageable){
        return facultateRepository.findAll(pageable);
    }
    @RequestMapping(value = "/registerFacultate/{inst_name}", method = RequestMethod.POST)
    public void saveFacultate(@RequestBody Facultate facultate, @PathVariable String inst_name) {
        facultate.setInstitution(institutionRepository.findByInstitutionName(inst_name));
        facultateRepository.save(facultate);
    }
    //Student -> Facultate
    @RequestMapping(value = "/deleteFacultate/{fac_id}", method = RequestMethod.DELETE)
    public void deleteFacultate(@PathVariable Long fac_id){
        List<Student> stFac = studentRepository.findByFacultate(facultateRepository.findOne(fac_id));
        studentRepository.delete(stFac);
        facultateRepository.delete(fac_id);
    }
    @RequestMapping(value = "/updateFacultate/{fc_id}", method = RequestMethod.POST)
    public void updateFacultate(@RequestBody Facultate facultate, @PathVariable Long fc_id){
        facultate.setId(fc_id);
        facultateRepository.save(facultate);
    }
}
