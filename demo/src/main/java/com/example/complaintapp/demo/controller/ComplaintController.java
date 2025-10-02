package com.example.complaintapp.demo.controller;

import com.example.complaintapp.demo.dto.ComplaintDTO;
import com.example.complaintapp.demo.model.Complaint;
import com.example.complaintapp.demo.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService){
        this.complaintService=complaintService;
    }

    @PostMapping
    public Complaint addComplaint(@RequestBody Complaint complaint, Principal principal){
        return complaintService.saveComplaint(complaint, principal.getName());
    }

    @GetMapping("/student")
    public List<ComplaintDTO> getStudentComplaints(Principal principal) {
        return complaintService.getComplaintsForStudent(principal.getName());
    }

    @GetMapping("/department")
    public List<Complaint> getDepartmentComplaints(Principal principal){
        return complaintService.getAllComplaintsForDepartment(principal.getName());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable Long id, @RequestBody String status){
        return complaintService.updateComplaintStatus(id,status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- THIS METHOD'S RETURN TYPE HAS BEEN UPDATED ---
    @GetMapping("/all")
    public List<ComplaintDTO> getAllComplaints(){
        return complaintService.getAllComplaintsForAdmin();
    }
}