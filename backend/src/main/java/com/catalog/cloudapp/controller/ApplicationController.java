package com.catalog.cloudapp.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.catalog.cloudapp.model.Application;
import com.catalog.cloudapp.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*") 
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    // CRUD: Create
    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        return ResponseEntity.ok(service.createApplication(application));
    }

    // CRUD: Read All
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(service.getAllApplications());
    }

    // CRUD: Read One
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getApplicationById(id));
    }

    // CRUD: Update
    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Long id, @RequestBody Application application) {
        return ResponseEntity.ok(service.updateApplication(id, application));
    }

    // CRUD: Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        service.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    // Track Usage
    @PostMapping("/{id}/launch")
    public ResponseEntity<Application> launchApplication(@PathVariable Long id) {
        return ResponseEntity.ok(service.incrementUsageCount(id));
    }

    // Search by Name
    @GetMapping("/search")
    public ResponseEntity<List<Application>> searchApplications(@RequestParam String name) {
        return ResponseEntity.ok(service.searchByName(name));
    }

    // Filter by Category and/or Tags
    @GetMapping("/filter")
    public ResponseEntity<List<Application>> filterApplications(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<String> tags) {
        return ResponseEntity.ok(service.filterByCategoryAndTags(category, tags));
    }

    // Get Most Used (Trending)
    @GetMapping("/trending")
    public ResponseEntity<List<Application>> getTrendingApplications() {
        return ResponseEntity.ok(service.getMostUsed());
    }

    // Recommendations
    @GetMapping("/{id}/recommendations")
    public ResponseEntity<List<Application>> getRecommendations(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRecommendations(id));
    }
}