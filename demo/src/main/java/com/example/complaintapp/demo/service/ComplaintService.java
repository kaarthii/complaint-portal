package com.example.complaintapp.demo.service;

import com.example.complaintapp.demo.dto.ComplaintDTO;
import com.example.complaintapp.demo.model.Complaint;
import com.example.complaintapp.demo.model.Users;
import com.example.complaintapp.demo.repository.ComplaintRepository;
import com.example.complaintapp.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    private static final Logger log = LoggerFactory.getLogger(ComplaintService.class);

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    @Autowired
    public ComplaintService (ComplaintRepository complaintRepository, UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }

    public Complaint saveComplaint(Complaint complaint, String username) {
        Users student=userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        complaint.setStudent(student);
        complaint.setStudentName(student.getUsername());
        return complaintRepository.save(complaint);
    }

    // --- THIS METHOD HAS BEEN UPDATED ---
    public List<ComplaintDTO> getAllComplaintsForAdmin(){
        log.info("Fetching all complaints for admin.");
        List<Complaint> complaints = complaintRepository.findAll();
        log.info("Found {} total complaints.", complaints.size());

        // Map the entities to DTOs before returning
        return complaints.stream()
                .map(complaint -> new ComplaintDTO(
                        complaint.getId(),
                        complaint.getCategory(),
                        complaint.getDepartment(),
                        complaint.getDescription(),
                        complaint.getStudentName(),
                        complaint.getStatus(),
                        complaint.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public List<ComplaintDTO> getComplaintsForStudent(String username) {
        log.info("Attempting to find complaints for username: '{}'", username);
        Users student = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        log.info("Found user '{}' with ID: {}", student.getUsername(), student.getId());
        List<Complaint> complaints = complaintRepository.findByStudentId(student.getId());
        log.info("Repository returned {} complaints for user ID {}", complaints.size(), student.getId());

        return complaints.stream()
                .map(complaint -> new ComplaintDTO(
                        complaint.getId(),
                        complaint.getCategory(),
                        complaint.getDepartment(),
                        complaint.getDescription(),
                        complaint.getStudentName(),
                        complaint.getStatus(),
                        complaint.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public List<Complaint> getAllComplaintsForDepartment(String username){
        Users deptUsers = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return complaintRepository.findByDepartment(deptUsers.getDepartment());
    }

    public Optional<Complaint> updateComplaintStatus(Long id,String status){
        Optional<Complaint> existingComplaint = complaintRepository.findById(id);
        if(existingComplaint.isPresent()){
            Complaint complaintToUpdate =existingComplaint.get();
            complaintToUpdate.setStatus(status);
            return  Optional.of(complaintRepository.save(complaintToUpdate));
        }
        return Optional.empty();
    }
}