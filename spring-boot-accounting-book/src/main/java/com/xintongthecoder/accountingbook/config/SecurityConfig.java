package com.xintongthecoder.accountingbook.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
                // protect endpoint /api/accounts/** only accessible to authenticated users
                httpSecurity.authorizeRequests(configurer -> configurer
                                .antMatchers("/api/accounts/**").authenticated()) // Protect
                                // the
                                // endpoint
                                // only
                                // accessible
                                // to
                                // authenticated
                                // users
                                .oauth2ResourceServer() // Configure OAuth2 resource server support
                                .jwt(); // Enable JWT-encoded bearer token support
                // Add CORS filters
                httpSecurity.cors();

                // Add content negotiation strategy
                httpSecurity.setSharedObject(ContentNegotiationStrategy.class,
                                new HeaderContentNegotiationStrategy());

                // Force a non-empty response body for 401's to response more friendly
                Okta.configureResourceServer401ResponseBody(httpSecurity);
                return httpSecurity.build();
        }
}
