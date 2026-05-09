package mk.ukim.vezilka.backend.web.controller;

import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.model.exceptions.UserAlreadyExistsException;
import mk.ukim.vezilka.backend.service.AuthService;
import mk.ukim.vezilka.backend.service.UserService;
import mk.ukim.vezilka.backend.util.JwtUtil;
import mk.ukim.vezilka.backend.web.request.LoginRequest;
import mk.ukim.vezilka.backend.web.request.RegisterRequest;
import mk.ukim.vezilka.backend.web.response.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(AuthService authService, JwtUtil jwtUtil, UserService userService) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            AppUser user = authService.register(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword());
            String jwtToken = jwtUtil.generateToken(user.getEmail());
            AuthResponse response = new AuthResponse(
                    jwtToken,
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getAvatarUrl(),
                    LocalDateTime.now()
            );
            return ResponseEntity.ok(response);
        } catch (UserAlreadyExistsException ex) {
            return ResponseEntity.status(409).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            AppUser user = authService.login(request.getEmail(), request.getPassword());
            String jwtToken = jwtUtil.generateToken(user.getEmail());
            AuthResponse response = new AuthResponse(
                    jwtToken,
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getAvatarUrl(),
                    user.getCreatedAt()
            );
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<AuthResponse> getUserByToken(Authentication authentication) {
        String email = authentication.getName();
        AppUser user = userService.getUserByEmail(email);
        String jwtToken = jwtUtil.generateToken(user.getEmail());
        AuthResponse response = new AuthResponse(user, jwtToken);
        return ResponseEntity.ok(response);
    }
}
