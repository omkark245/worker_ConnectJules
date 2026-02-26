package com.example.workerapp.repository;
import com.example.workerapp.model.JobInteraction;
import com.example.workerapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface JobInteractionRepository extends JpaRepository<JobInteraction, Long> {
    long countByWorker(User worker);
    boolean existsByWorkerAndJobId(User worker, Long jobId);
}
