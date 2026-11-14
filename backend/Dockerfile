# ===================================================================
# Sheladiya Consultancy - Production Backend Dockerfile
# Multi-stage build for Spring Boot 3.3.5 on Java 21 LTS
# Optimized for Render.com (low memory footprint, fast startup)
# ===================================================================

# Stage 1: Build the Application
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copy dependency definition to cache Maven dependencies in Docker layer
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package application JAR (skip unit tests for deterministic image build)
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Production JRE Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create unprivileged system group and user for container security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy built JAR from builder stage
COPY --from=builder /build/target/*.jar app.jar

# Dynamic port binding for Render ($PORT)
ENV PORT=8080
EXPOSE 8080

# Production JVM Ergonomics tuned for container constraints (e.g., Render 512MB RAM free tier):
# - MaxRAMPercentage=75.0: Allocates up to 75% of container RAM to JVM heap (~384MB on 512MB limit)
# - UseG1GC: Low-pause, memory-efficient garbage collector
# - java.security.egd: Non-blocking entropy generation for secure TLS/random generation
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-XX:+UseG1GC", "-Djava.security.egd=file:/dev/./urandom", "-Dserver.port=${PORT}", "-jar", "app.jar"]
