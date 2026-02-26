package com.example.workerapp.controller;

import com.example.workerapp.model.JobAd;
import com.example.workerapp.model.Transaction;
import com.example.workerapp.model.WorkerProfile;
import com.example.workerapp.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/workers")
    public ResponseEntity<List<WorkerProfile>> getAllWorkers() {
        return ResponseEntity.ok(adminService.getAllWorkers());
    }

    @PostMapping("/workers/{id}/verify")
    public ResponseEntity<WorkerProfile> verifyWorker(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.verifyWorker(id));
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<JobAd>> getAllJobs() {
        return ResponseEntity.ok(adminService.getAllJobs());
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(adminService.getAllTransactions());
    }
}
