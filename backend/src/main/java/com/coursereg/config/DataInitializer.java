package com.coursereg.config;

import com.coursereg.model.Course;
import com.coursereg.model.User;
import com.coursereg.repository.CourseRepository;
import com.coursereg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            // Create default admin if not exists
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);
                System.out.println("Default admin created - Username: admin, Password: admin123");
            }

            // Create sample courses if database is empty
            if (courseRepository.count() == 0) {
                Course course1 = new Course();
                course1.setName("Web Development Fundamentals");
                course1.setInstructor("John Smith");
                course1.setDescription("Learn HTML, CSS, and JavaScript basics to build modern websites");
                course1.setDuration("8 weeks");
                course1.setPrice(299);
                course1.setImage("💻");
                courseRepository.save(course1);

                Course course2 = new Course();
                course2.setName("Data Science with Python");
                course2.setInstructor("Dr. Sarah Johnson");
                course2.setDescription("Master data analysis, visualization, and machine learning with Python");
                course2.setDuration("12 weeks");
                course2.setPrice(499);
                course2.setImage("📊");
                courseRepository.save(course2);

                Course course3 = new Course();
                course3.setName("Mobile App Development");
                course3.setInstructor("Mike Chen");
                course3.setDescription("Build native mobile applications for iOS and Android");
                course3.setDuration("10 weeks");
                course3.setPrice(399);
                course3.setImage("📱");
                courseRepository.save(course3);

                Course course4 = new Course();
                course4.setName("Cloud Computing Essentials");
                course4.setInstructor("Emily Rodriguez");
                course4.setDescription("Deploy and manage applications on AWS, Azure, and Google Cloud");
                course4.setDuration("6 weeks");
                course4.setPrice(349);
                course4.setImage("☁️");
                courseRepository.save(course4);

                Course course5 = new Course();
                course5.setName("Cybersecurity Fundamentals");
                course5.setInstructor("David Williams");
                course5.setDescription("Protect systems, networks, and data from cyber threats");
                course5.setDuration("8 weeks");
                course5.setPrice(449);
                course5.setImage("🔒");
                courseRepository.save(course5);

                System.out.println("Sample courses created successfully");
            }
        };
    }
}
