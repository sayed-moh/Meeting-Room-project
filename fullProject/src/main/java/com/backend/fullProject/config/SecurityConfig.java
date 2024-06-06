package com.backend.fullProject.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.fullProject.jwtconfig.JwtRequestFilter;
import com.backend.fullProject.jwtconfig.JwtUtil;
import com.backend.fullProject.service.UserDetailsService;





@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
//	@Autowired
//	private BlackListedService blackListedService;

    @Autowired
    private UserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                
                .antMatchers(HttpMethod.GET, "/api/**").hasRole("SENIOR")
                .antMatchers(HttpMethod.POST, "/api/**").hasRole("SENIOR")
                .antMatchers(HttpMethod.PUT, "/api/**").hasRole("JONUR")
                .antMatchers(HttpMethod.DELETE, "/api/**").hasRole("JONUR")
            
                
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/signout").permitAll()
        
                .anyRequest().authenticated()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

//        http.addFilterBefore(new JwtRequestFilter(jwtUtil, customUserDetailsService,blackListedService), UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }
}
