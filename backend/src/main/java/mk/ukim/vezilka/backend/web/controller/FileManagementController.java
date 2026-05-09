package mk.ukim.vezilka.backend.web.controller;

import jakarta.validation.constraints.NotBlank;
import mk.ukim.vezilka.backend.model.Content;
import mk.ukim.vezilka.backend.service.FileManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/files")
public class FileManagementController {
    private final FileManagementService fileManagementService;

    public FileManagementController(FileManagementService fileManagementService) {
        this.fileManagementService = fileManagementService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Content> uploadFile(
            Authentication authentication,
            @NotBlank @RequestParam("topic") String topic,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String email = authentication.getName();
        Content result = fileManagementService.uploadFile(topic, description, 0L,  file, email); // mock dialect for now
        return ResponseEntity.ok(result);
    }
}
