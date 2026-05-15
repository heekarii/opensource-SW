package com.example.backend.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Restaurant Review API",
                version = "v1",
                description = "Restaurant review service API"
        )
)
public class OpenApiConfig {
}
