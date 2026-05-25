package mk.ukim.vezilka.backend.web.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.vezilka.backend.model.Review;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private LocalDateTime createdAt;
    private String reviewerFullName;

    public ReviewResponse(Review review) {
        this.createdAt = review.getCreatedAt();
        this.reviewerFullName = review.getReviewer().getFullName();
    }
}
