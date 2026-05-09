package mk.ukim.vezilka.backend.web.controller;

import jakarta.validation.Valid;
import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.service.UserService;
import mk.ukim.vezilka.backend.web.request.EditUserRequest;
import mk.ukim.vezilka.backend.web.response.AuthResponse;
import mk.ukim.vezilka.backend.web.response.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResponseEntity<UserResponse> getUserDetails(Authentication authentication) {
        String email = authentication.getName();
        AppUser user = userService.getUserByEmail(email);

        UserResponse response = new UserResponse(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/edit")
    public ResponseEntity<UserResponse> editUser(Authentication authentication,
                                                 @Valid @RequestBody EditUserRequest request) {
        String email = authentication.getName();
        AppUser user = userService.editUser(
                email,
                request.getFirstName(),
                request.getLastName(),
                request.getPhoneNumber(),
                request.getLocation(),
                request.getBiography()
        );

        UserResponse response = new UserResponse(user);
        return ResponseEntity.ok(response);
    }
}
