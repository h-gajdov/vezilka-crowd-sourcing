package mk.ukim.vezilka.backend.web.controller;

import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.model.exceptions.UserAlreadyExistsException;
import mk.ukim.vezilka.backend.service.AuthService;
import mk.ukim.vezilka.backend.util.JwtUtil;
import mk.ukim.vezilka.backend.web.request.LoginRequest;
import mk.ukim.vezilka.backend.web.request.RegisterRequest;
import mk.ukim.vezilka.backend.web.response.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            AppUser user = authService.register(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword());
            String jwtToken = jwtUtil.generateToken(user.getEmail());
            AuthResponse response = new AuthResponse(jwtToken, user.getFirstName(), user.getLastName(), user.getEmail());
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
            AuthResponse response = new AuthResponse(jwtToken, user.getFirstName(), user.getLastName(), user.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
