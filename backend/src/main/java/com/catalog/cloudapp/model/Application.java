package com.catalog.cloudapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private String category;
    private String version;

    @ElementCollection
    @CollectionTable(name = "application_dependencies", joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "dependency")
    private List<String> dependencies;

    @ElementCollection
    @CollectionTable(name = "application_tags", joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "tag")
    private List<String> tags;

    private Integer usageCount = 0;

    // Constructors
    public Application() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public List<String> getDependencies() { return dependencies; }
    public void setDependencies(List<String> dependencies) { this.dependencies = dependencies; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public Integer getUsageCount() { return usageCount; }
    public void setUsageCount(Integer usageCount) { this.usageCount = usageCount; }
}