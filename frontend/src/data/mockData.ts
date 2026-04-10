import { Application } from '@/types/application';

export const CATEGORIES = [
  'DevOps', 'Database', 'Monitoring', 'Security', 'AI/ML', 'Storage', 'Networking', 'Analytics',
];

export const ALL_TAGS = [
  'containerized', 'serverless', 'open-source', 'enterprise', 'real-time',
  'scalable', 'microservices', 'cloud-native', 'managed', 'self-hosted',
];

export const ICONS = ['☁️', '🔧', '📊', '🛡️', '🤖', '💾', '🌐', '📈', '⚡', '🔍', '🐳', '🔒'];

export const mockApplications: Application[] = [
  {
    id: '1', name: 'Kubernetes Engine', description: 'Container orchestration platform for deploying, scaling, and managing containerized applications across clusters.',
    category: 'DevOps', version: '1.28.3', dependencies: ['Docker', 'etcd', 'CoreDNS'],
    tags: ['containerized', 'scalable', 'cloud-native'], usageCount: 15420,
    createdAt: '2024-01-15', updatedAt: '2024-03-20', icon: '🐳', status: 'active',
  },
  {
    id: '2', name: 'PostgreSQL Cloud', description: 'Fully managed relational database service with automatic backups, high availability, and real-time replication.',
    category: 'Database', version: '16.1', dependencies: ['libpq', 'pgBouncer'],
    tags: ['managed', 'scalable', 'enterprise'], usageCount: 12850,
    createdAt: '2024-02-01', updatedAt: '2024-03-18', icon: '💾', status: 'active',
  },
  {
    id: '3', name: 'Prometheus Stack', description: 'Monitoring and alerting toolkit for cloud-native environments with powerful query language and visualization.',
    category: 'Monitoring', version: '2.48.0', dependencies: ['Alertmanager', 'Grafana', 'Node Exporter'],
    tags: ['open-source', 'real-time', 'cloud-native'], usageCount: 9870,
    createdAt: '2024-01-20', updatedAt: '2024-03-15', icon: '📊', status: 'active',
  },
  {
    id: '4', name: 'Vault Enterprise', description: 'Secrets management and data protection platform with dynamic secrets and encryption as a service.',
    category: 'Security', version: '1.15.4', dependencies: ['Consul', 'Terraform'],
    tags: ['enterprise', 'self-hosted'], usageCount: 7650,
    createdAt: '2024-01-10', updatedAt: '2024-03-22', icon: '🔒', status: 'active',
  },
  {
    id: '5', name: 'TensorFlow Serving', description: 'Flexible, high-performance serving system for machine learning models designed for production environments.',
    category: 'AI/ML', version: '2.14.0', dependencies: ['TensorFlow', 'gRPC', 'Docker'],
    tags: ['containerized', 'scalable', 'open-source'], usageCount: 6340,
    createdAt: '2024-02-10', updatedAt: '2024-03-19', icon: '🤖', status: 'active',
  },
  {
    id: '6', name: 'MinIO Object Store', description: 'High-performance, S3-compatible object storage for cloud-native workloads and data lakes.',
    category: 'Storage', version: '2024.3.15', dependencies: ['erasure-coding'],
    tags: ['open-source', 'scalable', 'cloud-native'], usageCount: 8920,
    createdAt: '2024-01-25', updatedAt: '2024-03-21', icon: '☁️', status: 'active',
  },
  {
    id: '7', name: 'Istio Service Mesh', description: 'Connect, secure, control, and observe services with an open platform service mesh.',
    category: 'Networking', version: '1.20.2', dependencies: ['Envoy', 'Kubernetes'],
    tags: ['microservices', 'cloud-native', 'open-source'], usageCount: 5210,
    createdAt: '2024-02-05', updatedAt: '2024-03-17', icon: '🌐', status: 'active',
  },
  {
    id: '8', name: 'Apache Kafka Streams', description: 'Distributed event streaming platform for high-throughput, real-time data pipelines.',
    category: 'Analytics', version: '3.6.1', dependencies: ['ZooKeeper', 'Java Runtime'],
    tags: ['real-time', 'scalable', 'enterprise'], usageCount: 11200,
    createdAt: '2024-01-30', updatedAt: '2024-03-16', icon: '📈', status: 'active',
  },
  {
    id: '9', name: 'Redis Cloud', description: 'In-memory data store used as a database, cache, message broker, and streaming engine.',
    category: 'Database', version: '7.2.4', dependencies: [],
    tags: ['managed', 'real-time', 'scalable'], usageCount: 13500,
    createdAt: '2024-02-08', updatedAt: '2024-03-23', icon: '⚡', status: 'active',
  },
  {
    id: '10', name: 'Grafana Dashboard', description: 'Open-source analytics and interactive visualization web application for monitoring metrics.',
    category: 'Monitoring', version: '10.3.1', dependencies: ['Prometheus', 'Loki'],
    tags: ['open-source', 'real-time', 'cloud-native'], usageCount: 10100,
    createdAt: '2024-02-12', updatedAt: '2024-03-14', icon: '📊', status: 'active',
  },
  {
    id: '11', name: 'ArgoCD', description: 'Declarative GitOps continuous delivery tool for Kubernetes applications.',
    category: 'DevOps', version: '2.9.5', dependencies: ['Kubernetes', 'Git'],
    tags: ['cloud-native', 'open-source', 'containerized'], usageCount: 7800,
    createdAt: '2024-02-15', updatedAt: '2024-03-20', icon: '🔧', status: 'active',
  },
  {
    id: '12', name: 'Elasticsearch', description: 'Distributed search and analytics engine for all types of data, including textual, numerical, geospatial.',
    category: 'Analytics', version: '8.12.0', dependencies: ['Kibana', 'Logstash'],
    tags: ['scalable', 'enterprise', 'real-time'], usageCount: 9400,
    createdAt: '2024-01-18', updatedAt: '2024-03-12', icon: '🔍', status: 'beta',
  },
];

export const usageOverTimeData = [
  { month: 'Oct', apps: 45, users: 1200 },
  { month: 'Nov', apps: 52, users: 1450 },
  { month: 'Dec', apps: 48, users: 1380 },
  { month: 'Jan', apps: 61, users: 1820 },
  { month: 'Feb', apps: 72, users: 2100 },
  { month: 'Mar', apps: 85, users: 2650 },
];

export const categoryDistribution = [
  { name: 'DevOps', value: 28 },
  { name: 'Database', value: 22 },
  { name: 'Monitoring', value: 18 },
  { name: 'Security', value: 12 },
  { name: 'AI/ML', value: 10 },
  { name: 'Other', value: 10 },
];
