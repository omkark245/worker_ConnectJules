package com.example.workerapp.service;

import com.example.workerapp.model.JobAd;
import com.example.workerapp.model.Transaction;
import com.example.workerapp.model.WorkerProfile;
import com.example.workerapp.repository.JobAdRepository;
import com.example.workerapp.repository.TransactionRepository;
import com.example.workerapp.repository.WorkerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final WorkerProfileRepository workerProfileRepository;
    private final JobAdRepository jobAdRepository;
    private final TransactionRepository transactionRepository;

    public List<WorkerProfile> getAllWorkers() {
        return workerProfileRepository.findAll();
    }

    public WorkerProfile verifyWorker(Long workerProfileId) {
        WorkerProfile profile = workerProfileRepository.findById(workerProfileId).orElseThrow();
        profile.setIsVerified(true);
        return workerProfileRepository.save(profile);
    }

    public List<JobAd> getAllJobs() {
        return jobAdRepository.findAll();
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
