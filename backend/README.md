# Sheladiya Consultancy - Backend Service

> **TRUTH • HONESTY • DISCIPLINE**  
> Enterprise Spring Boot REST API for Sheladiya Consultancy Legal and Corporate Services.

---

## 1. Technology Stack

- **Runtime:** Java JDK 21 LTS
- **Framework:** Spring Boot 3.3.5
- **Build Tool:** Apache Maven 3.9 (with standard Maven Wrapper `mvnw` / `mvnw.cmd`)
- **Primary Database:** MySQL 8.0+
- **Test Database:** H2 In-Memory Database (MySQL compatibility mode)
- **Database Migrations:** Flyway 10.x
- **Security:** Spring Security 6.x + Stateless JWT (`jjwt` 0.12.6)
- **Validation:** Jakarta Validation (`spring-boot-starter-validation`)
- **ORM / Persistence:** Spring Data JPA / Hibernate 6.x

---

## 2. Directory Structure

```
Sheladiya-Consultancy/
│
├── Existing React Frontend        # Untouched React + Vite Frontend
│
└── backend/
    ├── .mvn/wrapper/              # Maven Wrapper properties
    ├── src/
    │   ├── main/
    │   │   ├── java/com/sheladiya/consultancy/
    │   │   │   ├── config/        # CORS & Web MVC configuration
    │   │   │   ├── controller/    # Public & Admin REST Controllers
    │   │   │   ├── dto/           # Request & Response Data Transfer Objects
    │   │   │   ├── entity/        # JPA Entities (Contact, Consultation, AdminUser)
    │   │   │   ├── exception/     # Global exception handler & custom exceptions
    │   │   │   ├── repository/    # Spring Data JPA repositories
    │   │   │   ├── security/      # JWT filter, provider, UserDetailsService, SecurityConfig
    │   │   │   ├── service/       # Business logic interfaces & implementations
    │   │   │   └── SheladiyaConsultancyApplication.java
    │   │   └── resources/
    │   │       ├── application.properties    # Primary MySQL production/dev configuration
    │   │       └── db/migration/
    │   │           └── V1__initial_schema.sql # Flyway baseline schema for MySQL 8
    │   └── test/
    │       ├── java/com/sheladiya/consultancy/
    │       │   ├── SheladiyaConsultancyApplicationTests.java
    │       │   └── controller/
    │       │       ├── ContactControllerTest.java
    │       │       ├── ConsultationControllerTest.java
    │       │       └── HealthControllerTest.java
    │       └── resources/
    │           └── application.properties    # Isolated H2 test profile
    ├── pom.xml                    # Maven dependencies & build configuration
    ├── mvnw                       # Shell Maven Wrapper
    ├── mvnw.cmd                   # Windows CMD Maven Wrapper
    └── README.md                  # Complete documentation & run guide
```

---

## 3. Environment Variables

The backend is configured following 12-factor principles. **No credentials or secrets are hardcoded.**

| Variable | Description | Default (Dev Fallback) |
| :--- | :--- | :--- |
| `DB_URL` | JDBC URL for MySQL 8 Server | `jdbc:mysql://localhost:3306/sheladiya_consultancy?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true` |
| `DB_USERNAME` | MySQL database user | `root` |
| `DB_PASSWORD` | MySQL database password | *(empty)* |
| `JWT_SECRET` | 256-bit Hex secret key for signing JWT tokens | Pre-generated 256-bit dev key |
| `JWT_EXPIRATION_MS` | JWT validity duration in milliseconds | `86400000` (24 Hours) |
| `ADMIN_DEFAULT_USERNAME` | Initial administrator username | `admin` |
| `ADMIN_DEFAULT_EMAIL` | Initial administrator email | `admin@sheladiyaconsultancy.com` |
| `ADMIN_DEFAULT_PASSWORD` | Initial administrator password | *(must be provided to bootstrap)* |
| `CORS_ALLOWED_ORIGINS` | Permitted web origins for frontend | `http://localhost:5173,http://localhost:3000` |
| `PORT` | HTTP port for Spring Boot application | `8080` |

---

## 4. Running the Application

### A. Run Automated Unit & Integration Tests (H2 Database)
The automated test suite runs completely isolated from MySQL using an in-memory H2 database:

```cmd
cd backend
mvnw.cmd test
```

### B. Run the Backend with MySQL
Once MySQL Server 8.0 is running and credentials are set:

```cmd
cd backend
set DB_URL=jdbc:mysql://localhost:3306/sheladiya_consultancy
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
set ADMIN_DEFAULT_PASSWORD=YourSecureAdminPassword!
mvnw.cmd spring-boot:run
```

---

## 5. REST API Specifications

### Public Endpoints

#### 1. Submit Contact Inquiry
- **Method / Path:** `POST /api/v1/contact`
- **Request Body:**
  ```json
  {
    "fullName": "Adv. Rajesh Patel",
    "phone": "+91 98765 43210",
    "email": "rajesh@example.com",
    "practiceArea": "Corporate Consultancy",
    "message": "Assistance needed for private company incorporation and compliance.",
    "disclaimerAgreed": true,
    "submittedAt": "2026-11-12T10:00:00Z"
  }
  ```
- **Response:** HTTP `201 Created` with saved inquiry and confirmation.

#### 2. Schedule Consultation
- **Method / Path:** `POST /api/v1/consultations`
- **Request Body:**
  ```json
  {
    "name": "Jane Smith",
    "phone": "+91 98220 12345",
    "email": "jane.smith@example.com",
    "service": "Property Consultancy",
    "mode": "in-person",
    "preferredDate": "2026-11-25",
    "notes": "Title search report and deed verification.",
    "agreed": true,
    "submittedAt": "2026-11-12T10:00:00Z"
  }
  ```
- **Response:** HTTP `201 Created` with unique appointment reference number (e.g. `SC-2026-48291`).

#### 3. Track Consultation Status
- **Method / Path:** `GET /api/v1/consultations/reference/{referenceNumber}`
- **Response:** HTTP `200 OK` with consultation status.

#### 4. Service Health Check
- **Method / Path:** `GET /api/v1/health`
- **Response:** HTTP `200 OK` with service uptime and version.

---

### Protected Admin Endpoints (`Bearer <JWT>` required)

#### 1. Admin Login
- **Method / Path:** `POST /api/v1/auth/login`
- **Request Body:** `{"username": "admin", "password": "..."}`
- **Response:** HTTP `200 OK` with JWT accessToken, expiration, and role.

#### 2. Get Current Admin Profile
- **Method / Path:** `GET /api/v1/auth/me`

#### 3. View All Contact Inquiries (Paginated)
- **Method / Path:** `GET /api/v1/admin/contacts?page=0&size=20`

#### 4. Update Inquiry Status
- **Method / Path:** `PATCH /api/v1/admin/contacts/{id}/status`
- **Body:** `{"status": "REVIEWED"}`

#### 5. View All Consultations (Paginated)
- **Method / Path:** `GET /api/v1/admin/consultations?page=0&size=20`

#### 6. Update Consultation Status
- **Method / Path:** `PATCH /api/v1/admin/consultations/{id}/status`
- **Body:** `{"status": "CONFIRMED"}`
