package mk.ukim.vezilka.backend.web.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import mk.ukim.vezilka.backend.model.Activity;
import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.model.Content;
import mk.ukim.vezilka.backend.service.ActivityService;
import mk.ukim.vezilka.backend.service.UserService;
import mk.ukim.vezilka.backend.web.request.EditUserRequest;
import mk.ukim.vezilka.backend.web.response.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final ActivityService activityService;

    public UserController(UserService userService, ActivityService activityService) {
        this.userService = userService;
        this.activityService = activityService;
    }

    @GetMapping("/uploads")
    public ResponseEntity<List<ContentResponse>> getUploads(Authentication authentication) {
        String email = authentication.getName();
        List<Content> posts = userService.getUploadsByUser(email);
        List<ContentResponse> result = posts.stream().map(ContentResponse::new).toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/details")
    public ResponseEntity<UserResponse> getUserDetails(Authentication authentication) {
        String email = authentication.getName();
        AppUser user = userService.getUserByEmail(email);

        UserResponse response = new UserResponse(user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStas(Authentication authentication) {
        String email = authentication.getName();
        AppUser user = userService.getUserByEmail(email);
        DashboardStatsResponse response = new DashboardStatsResponse(user);
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

    @PostMapping("/avatar")
    public ResponseEntity<UserResponse> setAvatarPicture(Authentication authentication,
                                                         @RequestParam("file") MultipartFile file) throws IOException {
        String email = authentication.getName();
        AppUser user =  userService.editAvatarPicture(email, file);
        UserResponse response = new UserResponse(user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/avatar")
    public ResponseEntity<UserResponse> removeAvatarPicture(Authentication authentication) {
        String email = authentication.getName();
        AppUser user = userService.removeAvatarPicture(email);
        UserResponse response = new UserResponse(user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/activity")
    public ResponseEntity<List<ActivityResponse>> getActivity(Authentication authentication,
                                                              @RequestParam(value = "pageSize", defaultValue = "5") int pageSize) {
        String email = authentication.getName();
        AppUser user = userService.getUserByEmail(email);

        List<Activity> activities = activityService.getActivitiesByUser(user, pageSize);
        List<ActivityResponse> responses = activities.stream().map(ActivityResponse::new).toList();
        return ResponseEntity.ok(responses);
    }
}
