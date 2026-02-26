package com.example.workerapp.service;

import com.example.workerapp.model.JobAd;
import com.example.workerapp.model.JobInteraction;
import com.example.workerapp.model.User;
import com.example.workerapp.model.Wallet;
import com.example.workerapp.repository.JobAdRepository;
import com.example.workerapp.repository.JobInteractionRepository;
import com.example.workerapp.repository.WalletRepository;
import com.example.workerapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobAdService {
    private final JobAdRepository jobAdRepository;
    private final JobInteractionRepository interactionRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public JobAd postJob(JobAd jobAd, String username) {
        User customer = userRepository.findByUsername(username).orElseThrow();
        jobAd.setCustomer(customer);
        return jobAdRepository.save(jobAd);
    }

    public List<JobAd> getAllJobs() {
        return jobAdRepository.findAll();
    }

    @Transactional
    public String viewJobContact(Long jobId, String username) {
        User worker = userRepository.findByUsername(username).orElseThrow();

        // Check if already interacted
        if (interactionRepository.existsByWorkerAndJobId(worker, jobId)) {
            JobAd job = jobAdRepository.findById(jobId).orElseThrow();
            return "Customer contact: " + job.getCustomer().getEmail();
        }

        long interactionCount = interactionRepository.countByWorker(worker);

        if (interactionCount >= 10) {
            Wallet wallet = walletRepository.findByWorker(worker).orElseThrow();
            if (wallet.getBalance() < 100.0) {
                throw new RuntimeException("Insufficient wallet balance. Please add ₹100 to view more jobs.");
            }
            wallet.setBalance(wallet.getBalance() - 100.0);
            walletRepository.save(wallet);
        }

        JobInteraction interaction = JobInteraction.builder()
                .worker(worker)
                .job(jobAdRepository.findById(jobId).orElseThrow())
                .build();
        interactionRepository.save(interaction);

        JobAd job = jobAdRepository.findById(jobId).orElseThrow();
        return "Customer contact: " + job.getCustomer().getEmail();
    }
}
