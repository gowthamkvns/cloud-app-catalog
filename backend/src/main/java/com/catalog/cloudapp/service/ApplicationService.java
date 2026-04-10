package com.catalog.cloudapp.service;

import com.catalog.cloudapp.model.Application;
import com.catalog.cloudapp.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository repository;

    public ApplicationService(ApplicationRepository repository) {
        this.repository = repository;
    }

    public Application createApplication(Application app) {
        if (app.getUsageCount() == null) {
            app.setUsageCount(0);
        }
        return repository.save(app);
    }

    public List<Application> getAllApplications() {
        return repository.findAll();
    }

    public Application getApplicationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }

    public Application updateApplication(Long id, Application updatedApp) {
        Application existingApp = getApplicationById(id);
        existingApp.setName(updatedApp.getName());
        existingApp.setDescription(updatedApp.getDescription());
        existingApp.setCategory(updatedApp.getCategory());
        existingApp.setVersion(updatedApp.getVersion());
        existingApp.setDependencies(updatedApp.getDependencies());
        existingApp.setTags(updatedApp.getTags());
        // Do not overwrite usageCount automatically on general updates
        return repository.save(existingApp);
    }

    public void deleteApplication(Long id) {
        repository.deleteById(id);
    }

    public Application incrementUsageCount(Long id) {
        Application app = getApplicationById(id);
        app.setUsageCount(app.getUsageCount() + 1);
        return repository.save(app);
    }

    public List<Application> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    public List<Application> filterByCategoryAndTags(String category, List<String> tags) {
        List<Application> apps;
        
        if (category != null && !category.isEmpty()) {
            apps = repository.findByCategoryIgnoreCase(category);
        } else {
            apps = repository.findAll();
        }

        if (tags != null && !tags.isEmpty()) {
            apps = apps.stream()
                    .filter(app -> app.getTags() != null && app.getTags().stream().anyMatch(tags::contains))
                    .collect(Collectors.toList());
        }
        return apps;
    }

    public List<Application> getMostUsed() {
        return repository.findTop10ByOrderByUsageCountDesc();
    }

    public List<Application> getRecommendations(Long id) {
        Application app = getApplicationById(id);
        // Recommend other apps in the same category
        return repository.findByCategoryAndIdNot(app.getCategory(), id)
                .stream()
                .limit(5)
                .collect(Collectors.toList());
    }
}