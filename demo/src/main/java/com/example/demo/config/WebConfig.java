package com.example.demo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow CORS for all paths
                .allowedOrigins("https:///1070-116-72-150-31.ngrok-free.app")  // Allow requests from any origin
                .allowedMethods("GET", "POST", "DELETE", "PUT")  // Allow specific HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .exposedHeaders("Authorization")  // Expose headers (optional)
                .allowCredentials(true);  // Allow credentials (e.g., cookies, authorization headers)
    }
}
