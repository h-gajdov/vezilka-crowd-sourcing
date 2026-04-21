package mk.ukim.vezilka.backend.web.controller;

import mk.ukim.vezilka.backend.model.Content;
import mk.ukim.vezilka.backend.service.FileManagementService;
import org.springframework.http.ResponseEntity;
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
            @RequestParam("topic") String topic,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        Content result = fileManagementService.uploadFile(topic, description, 0L, 0L, file); // mock dialect and uploader ids for now
        return ResponseEntity.ok(result);
    }
}
