package mk.ukim.vezilka.backend.web.controller;

import jakarta.validation.constraints.NotBlank;
import mk.ukim.vezilka.backend.model.Content;
import mk.ukim.vezilka.backend.service.FileManagementService;
import mk.ukim.vezilka.backend.web.request.UploadContentRequest;
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

    @PostMapping(value = "/upload",consumes = "multipart/form-data")
    public ResponseEntity<Content> uploadFile(
            Authentication authentication,
            @ModelAttribute UploadContentRequest request,
            @RequestPart("file") MultipartFile file
            ) throws IOException {
        String email = authentication.getName();
        Content result = fileManagementService.uploadFile(request.getTopic(), request.getDescription(), request.getTranscription(), request.isPrivateContent(), 0L,  file, email); // mock dialect for now
        return ResponseEntity.ok(result);
    }
}
