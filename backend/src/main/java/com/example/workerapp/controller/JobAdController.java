package com.example.workerapp.controller;

import com.example.workerapp.model.JobAd;
import com.example.workerapp.service.JobAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobAdController {
    private final JobAdService jobAdService;

    @PostMapping
    public ResponseEntity<JobAd> postJob(@RequestBody JobAd jobAd, Authentication authentication) {
        return ResponseEntity.ok(jobAdService.postJob(jobAd, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<JobAd>> getAllJobs() {
        return ResponseEntity.ok(jobAdService.getAllJobs());
    }

    @PostMapping("/{id}/view-contact")
    public ResponseEntity<String> viewContact(@PathVariable Long id, Authentication authentication) {
        try {
            return ResponseEntity.ok(jobAdService.viewJobContact(id, authentication.getName()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
