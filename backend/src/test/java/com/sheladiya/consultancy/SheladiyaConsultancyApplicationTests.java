package com.sheladiya.consultancy;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class SheladiyaConsultancyApplicationTests {

    @Test
    void contextLoads() {
        // Verifies Spring application context boots successfully with H2 test database
    }
}
