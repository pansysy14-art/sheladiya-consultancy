package com.sheladiya.consultancy.security;

import com.sheladiya.consultancy.entity.AdminUser;
import com.sheladiya.consultancy.repository.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default.username:admin}")
    private String defaultUsername;

    @Value("${admin.default.email:admin@sheladiyaconsultancy.com}")
    private String defaultEmail;

    @Value("${admin.default.password:}")
    private String defaultPassword;

    public AdminUserInitializer(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (adminUserRepository.count() == 0) {
            if (StringUtils.hasText(defaultPassword)) {
                AdminUser admin = new AdminUser(
                        defaultUsername,
                        defaultEmail,
                        passwordEncoder.encode(defaultPassword),
                        "ROLE_ADMIN"
                );
                adminUserRepository.save(admin);
                logger.info("Default administrator account created with username: '{}'", defaultUsername);
            } else {
                logger.warn("No administrator user found in database. Set ADMIN_DEFAULT_PASSWORD environment variable to bootstrap the initial admin account.");
            }
        }
    }
}
