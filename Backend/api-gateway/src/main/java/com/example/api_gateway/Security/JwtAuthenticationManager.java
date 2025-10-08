package com.example.api_gateway.Security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import reactor.core.publisher.Mono;

import java.util.List;
@RequiredArgsConstructor
public class JwtAuthenticationManager implements ReactiveAuthenticationManager {

    private final JwtUtils jwtUtils;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        String token = authentication.getCredentials().toString();

        try {
            jwtUtils.validateToken(token);
            String username = jwtUtils.extractUsername(token);

            List<SimpleGrantedAuthority> authorities = jwtUtils.extractRoles(token).stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                    .toList();

            return Mono.just(new UsernamePasswordAuthenticationToken(username, null, authorities));
        } catch (Exception e) {
            return Mono.error(new BadCredentialsException("Token inválido"));
        }
    }
}
