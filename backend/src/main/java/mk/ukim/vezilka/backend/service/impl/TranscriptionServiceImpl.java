package mk.ukim.vezilka.backend.service.impl;

import mk.ukim.vezilka.backend.model.Transcription;
import mk.ukim.vezilka.backend.repository.TranscriptionRepository;
import mk.ukim.vezilka.backend.service.TranscriptionService;
import org.springframework.stereotype.Service;

@Service
public class TranscriptionServiceImpl implements TranscriptionService {
    private final TranscriptionRepository transcriptionRepository;

    public TranscriptionServiceImpl(TranscriptionRepository transcriptionRepository) {
        this.transcriptionRepository = transcriptionRepository;
    }

    @Override
    public Transcription saveTranscription(Transcription transcription) {
        return transcriptionRepository.save(transcription);
    }
}
