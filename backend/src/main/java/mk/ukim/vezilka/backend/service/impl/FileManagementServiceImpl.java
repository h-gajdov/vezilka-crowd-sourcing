package mk.ukim.vezilka.backend.service.impl;

import mk.ukim.vezilka.backend.model.ActivityType;
import mk.ukim.vezilka.backend.model.AppUser;
import mk.ukim.vezilka.backend.model.Content;
import mk.ukim.vezilka.backend.model.Transcription;
import mk.ukim.vezilka.backend.model.enums.ContentType;
import mk.ukim.vezilka.backend.model.exceptions.ContentNotFoundException;
import mk.ukim.vezilka.backend.model.exceptions.InvalidFileException;
import mk.ukim.vezilka.backend.repository.ActivityTypeRepository;
import mk.ukim.vezilka.backend.repository.ContentRepository;
import mk.ukim.vezilka.backend.service.ActivityService;
import mk.ukim.vezilka.backend.service.FileManagementService;
import mk.ukim.vezilka.backend.service.TranscriptionService;
import mk.ukim.vezilka.backend.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileManagementServiceImpl implements FileManagementService {
    private final ContentRepository contentRepository;
    private final UserService userService;
    private final TranscriptionService transcriptionService;
    private final ActivityService activityService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public FileManagementServiceImpl(ContentRepository contentRepository, UserService userService, TranscriptionService transcriptionService, ActivityTypeRepository activityTypeRepository, ActivityService activityService) {
        this.contentRepository = contentRepository;
        this.userService = userService;
        this.transcriptionService = transcriptionService;
        this.activityService = activityService;
    }

    private Content createContentEntity(String originalFilename, ContentType type, String fileUrl, String topic, Long dialectId, String description, String transcription, boolean isPrivate, AppUser user) {
        Content content = new Content(originalFilename, type, fileUrl, topic, null, description, isPrivate, user);
        content = contentRepository.save(content);

        if (transcription != null && !transcription.isEmpty()) {
            Transcription subs = new Transcription(content, transcription);

            subs = transcriptionService.saveTranscription(subs);

            content.setTranscription(subs);
            content = contentRepository.save(content);
        }

        return content;
    }

    @Override
    public Content uploadFile(String topic, String description, String transcription, boolean isPrivate, Long dialectId, MultipartFile file, String userEmail) throws IOException {
        if (file.isEmpty()) {
            throw new InvalidFileException();
        }

        AppUser user = userService.getUserByEmail(userEmail);
        ContentType contentType = determineContentType(file.getContentType());
        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String finalFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        String relativePath = Paths.get("media")
                .resolve("uploads")
                .resolve("users")
                .resolve(String.valueOf(user.getId()))
                .resolve("data")
                .resolve(finalFilename)
                .toString()
                .replace("\\", "/");

        Path userStoragePath = Paths.get(uploadDir)
                .resolve("users")
                .resolve(String.valueOf(user.getId()))
                .resolve("data");
        Files.createDirectories(userStoragePath);

        Path targetLocation = userStoragePath.resolve(finalFilename);
        file.transferTo(targetLocation);

        Content content = createContentEntity(originalFilename, contentType, relativePath, topic, dialectId, description, transcription, isPrivate, user);
        ActivityType activityType = activityService.getActivityByName(contentType.name());
        activityService.logUpload(user, content, activityType);
        return content;
    }

    @Override
    public Resource loadFileAsResource(String path) {
        try {
            Path targetLocation = Paths.get(path).normalize();

            if (!targetLocation.startsWith(this.uploadDir.substring(2))) {
                throw new RuntimeException("Безбедносна грешка: Обид за пристап надвор од дозволениот директориум.");
            }

            Resource resource = new UrlResource(targetLocation.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Датотеката не е пронајдена или не може да се прочита: " + path);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Грешка при вчитување на датотеката: " + path, ex);
        }
    }

    private ContentType determineContentType(String mimeType) {
        if (mimeType == null) return ContentType.TEXT;

        if (mimeType.startsWith("image/")) return ContentType.IMAGE;
        if (mimeType.startsWith("audio/")) return ContentType.AUDIO;
        if (mimeType.startsWith("video/")) return ContentType.VIDEO;
        if (mimeType.startsWith("text/") || mimeType.contains("pdf")) return ContentType.TEXT;

        return ContentType.TEXT;
    }
}
