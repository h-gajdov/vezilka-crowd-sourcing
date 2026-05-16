package mk.ukim.vezilka.backend.web.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.vezilka.backend.model.AppUser;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String jwtToken;
    private String firstName;
    private String lastName;
    private String email;
    private String avatarUrl;
    private LocalDateTime createdAt;

    public AuthResponse(AppUser user, String jwtToken) {
        this.jwtToken = jwtToken;
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.avatarUrl = user.getAvatarUrl();
        this.createdAt = user.getCreatedAt();
    }
}
