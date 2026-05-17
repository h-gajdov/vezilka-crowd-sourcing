package mk.ukim.vezilka.backend.web.controller;

import jakarta.validation.constraints.NotBlank;
import mk.ukim.vezilka.backend.model.Content;
import mk.ukim.vezilka.backend.service.FileManagementService;
import mk.ukim.vezilka.backend.service.FileValidationService;
import mk.ukim.vezilka.backend.web.request.UploadContentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("api/files")
public class FileManagementController {
    private final FileManagementService fileManagementService;
    private final FileValidationService fileValidationService;

    public FileManagementController(FileManagementService fileManagementService, FileValidationService fileValidationService) {
        this.fileManagementService = fileManagementService;
        this.fileValidationService = fileValidationService;
    }

    @PostMapping(value = "/upload",consumes = "multipart/form-data")
    public ResponseEntity<?> uploadFile(
            Authentication authentication,
            @ModelAttribute UploadContentRequest request,
            @RequestPart("file") MultipartFile file
            ) throws IOException {
        try {
            fileValidationService.validate(file);
            String email = authentication.getName();
            Content result = fileManagementService.uploadFile(
                    request.getTopic(), request.getDescription(),
                    request.getTranscription(), request.isPrivateContent(),
                    0L, file, email);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity
                    .internalServerError()
                    .body(Map.of("message", ex.getMessage()));
        }
    }
}
