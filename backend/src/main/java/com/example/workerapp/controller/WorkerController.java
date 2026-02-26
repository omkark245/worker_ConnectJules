package com.example.workerapp.controller;

import com.example.workerapp.model.WorkerProfile;
import com.example.workerapp.service.WorkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workers")
@RequiredArgsConstructor
public class WorkerController {
    private final WorkerService workerService;

    @GetMapping("/best")
    public ResponseEntity<List<WorkerProfile>> getBestWorkers(
            @RequestParam String city,
            @RequestParam(required = false) String area
    ) {
        return ResponseEntity.ok(workerService.getBestWorkers(city, area));
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<WorkerProfile> rateWorker(
            @PathVariable Long id,
            @RequestParam Double rating
    ) {
        return ResponseEntity.ok(workerService.rateWorker(id, rating));
    }
}
