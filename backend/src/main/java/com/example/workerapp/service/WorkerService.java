package com.example.workerapp.service;

import com.example.workerapp.model.WorkerProfile;
import com.example.workerapp.repository.WorkerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkerService {
    private final WorkerProfileRepository workerProfileRepository;

    public List<WorkerProfile> getBestWorkers(String city, String area) {
        List<WorkerProfile> workers;
        if (area != null && !area.isEmpty()) {
            workers = workerProfileRepository.findByCityAndArea(city, area);
        } else {
            workers = workerProfileRepository.findByCity(city);
        }

        return workers.stream()
                .sorted(Comparator.comparing(WorkerProfile::getRating).reversed())
                .collect(Collectors.toList());
    }

    public WorkerProfile rateWorker(Long workerId, Double rating) {
        WorkerProfile profile = workerProfileRepository.findById(workerId).orElseThrow();
        double currentTotal = profile.getRating() * profile.getRatingCount();
        profile.setRatingCount(profile.getRatingCount() + 1);
        profile.setRating((currentTotal + rating) / profile.getRatingCount());
        return workerProfileRepository.save(profile);
    }
}
