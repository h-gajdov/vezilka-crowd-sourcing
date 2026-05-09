import { useState, useRef, useCallback } from "react";
import {
  FileText,
  Upload,
  Video,
  Mic,
  Image,
  X,
  Lock,
  Globe,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import DialectDropdown from "../components/DialectDropdown";
import UploadEntry from "../components/UploadEntry";
import { getToken } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ACCEPTED_TYPES = [
  "text/*",
  "image/*",
  "audio/*",
  "video/*",
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
];

const AUDIO_VIDEO_MIME_PREFIXES = ["audio/", "video/"];
const AUDIO_VIDEO_EXTENSIONS = [
  ".mp3",
  ".wav",
  ".ogg",
  ".flac",
  ".aac",
  ".m4a",
  ".mp4",
  ".mov",
  ".avi",
  ".mkv",
  ".webm",
  ".wmv",
];

function isAudioOrVideo(file) {
  if (AUDIO_VIDEO_MIME_PREFIXES.some((prefix) => file.type.startsWith(prefix)))
    return true;
  const ext = "." + file.name.split(".").pop().toLowerCase();
  return AUDIO_VIDEO_EXTENSIONS.includes(ext);
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function fileUpload(
  file,
  { dialect, topic, description, isPrivate, transcription, token },
  onProgress,
) {
  const formData = new FormData();
  formData.append("topic", topic);
  formData.append("description", description);
  formData.append("file", file);
  formData.append("privateContent", String(isPrivate));
  if (transcription) formData.append("transcription", transcription);

  const res = await fetch(`${BACKEND_URL}/api/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  onProgress(100);
}

export default function UploadPage() {
  const token = getToken();
  const [dialect, setDialect] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  // Each entry: { id, file, transcription, transcriptionOpen }
  const [stagedFiles, setStagedFiles] = useState([]);
  const [entries, setEntries] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const addStagedFiles = (files) => {
    setStagedFiles((prev) => [
      ...prev,
      ...files.map((f) => ({
        id: generateId(),
        file: f,
        transcription: "",
        transcriptionOpen: true,
      })),
    ]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length) addStagedFiles(dropped);
  }, []);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length) addStagedFiles(selected);
    e.target.value = "";
  };

  const removeStagedFile = (id) => {
    setStagedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateStagedFile = (id, patch) => {
    setStagedFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    );
  };

  const handleSubmit = async () => {
    if (!stagedFiles.length) return;

    const newEntries = stagedFiles.map(({ id, file, transcription }) => ({
      id,
      file,
      dialect,
      topic,
      description,
      isPrivate,
      transcription: isAudioOrVideo(file) ? transcription : "",
      status: "uploading",
      progress: 0,
    }));

    setEntries((prev) => [...newEntries, ...prev]);
    setStagedFiles([]);

    await Promise.allSettled(
      newEntries.map(async (entry) => {
        try {
          await fileUpload(
            entry.file,
            {
              dialect,
              topic,
              description,
              isPrivate,
              transcription: entry.transcription,
              token,
            },
            (progress) => {
              setEntries((prev) =>
                prev.map((e) => (e.id === entry.id ? { ...e, progress } : e)),
              );
            },
          );
          setEntries((prev) =>
            prev.map((e) =>
              e.id === entry.id ? { ...e, status: "done", progress: 100 } : e,
            ),
          );
        } catch {
          setEntries((prev) =>
            prev.map((e) =>
              e.id === entry.id ? { ...e, status: "error" } : e,
            ),
          );
        }
      }),
    );
  };

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeButtonIndex={1} />

      <main className="flex-1 pb-20 overflow-auto lg:pb-0 pt-14 lg:pt-0">
        <div className="max-w-6xl p-6 mx-auto md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold md:text-3xl">Прикачи содржина</h1>
            <p className="mt-1 text-muted-foreground">
              Сподели податоци на македонски јазик
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left column — drop zone + staged files */}
            <div className="space-y-4">
              <div
                role="button"
                tabIndex={0}
                aria-label="Прикачи датотеки"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) =>
                  e.key === "Enter" && fileInputRef.current?.click()
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-10 text-center transition-colors border-2 border-dashed cursor-pointer rounded-2xl
                  ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
              >
                <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <p className="mb-1 text-base font-medium">
                  Влечи и пушти датотеки овде
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  или кликни за да избереш
                </p>
                <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    Текст
                  </span>
                  <span className="flex items-center gap-1">
                    <Image className="w-4 h-4" />
                    Слика
                  </span>
                  <span className="flex items-center gap-1">
                    <Mic className="w-4 h-4" />
                    Аудио
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    Видео
                  </span>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_TYPES.join(",")}
                className="hidden"
                onChange={handleFileChange}
              />

              {stagedFiles.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Избрани датотеки ({stagedFiles.length})
                  </p>

                  {stagedFiles.map(
                    ({ id, file, transcription, transcriptionOpen }) => {
                      const isMedia = isAudioOrVideo(file);
                      const isVideo = file.type.startsWith("video/");

                      return (
                        <div
                          key={id}
                          className="overflow-hidden border rounded-lg border-border bg-muted/40"
                        >
                          {/* File row */}
                          <div className="flex items-center gap-3 px-3 py-2">
                            {isMedia ? (
                              isVideo ? (
                                <Video className="w-4 h-4 text-muted-foreground shrink-0" />
                              ) : (
                                <Mic className="w-4 h-4 text-muted-foreground shrink-0" />
                              )
                            ) : (
                              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                            )}
                            <span className="flex-1 text-sm truncate">
                              {file.name}
                            </span>

                            {/* Transcription toggle — only for audio/video */}
                            {isMedia && (
                              <button
                                onClick={() =>
                                  updateStagedFile(id, {
                                    transcriptionOpen: !transcriptionOpen,
                                  })
                                }
                                className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                aria-expanded={transcriptionOpen}
                                aria-label="Транскрипција"
                              >
                                <ChevronDown
                                  className="w-3.5 h-3.5 transition-transform duration-200"
                                  style={{
                                    transform: transcriptionOpen
                                      ? "rotate(0deg)"
                                      : "rotate(-90deg)",
                                  }}
                                />
                                Транскрипција
                                {transcription && !transcriptionOpen && (
                                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                                )}
                              </button>
                            )}

                            <button
                              onClick={() => removeStagedFile(id)}
                              className="p-0.5 rounded text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Отстрани"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Collapsible transcription panel — always rendered, animated via max-height */}
                          {isMedia && (
                            <div
                              style={{
                                display: "grid",
                                gridTemplateRows: transcriptionOpen
                                  ? "1fr"
                                  : "0fr",
                                transition: "grid-template-rows 200ms ease",
                              }}
                            >
                              <div className="overflow-hidden">
                                <div className="px-3 pt-1 pb-3">
                                  <textarea
                                    value={transcription}
                                    onChange={(e) =>
                                      updateStagedFile(id, {
                                        transcription: e.target.value,
                                      })
                                    }
                                    className="flex w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                                    placeholder="пр. Добредојдовте на денешната емисија..."
                                    rows={3}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>

            {/* Right column — metadata + visibility */}
            <div className="space-y-5">
              <DialectDropdown value={dialect} onChange={setDialect} />

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Тема</label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                  placeholder="пр. Вести, Литература, Секојдневен говор"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Опис</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Накратко опиши ја содржината..."
                  rows={4}
                />
              </div>

              {/* Privacy toggle */}
              <div className="flex items-start gap-3 p-4 border rounded-xl border-border bg-muted/30">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="privacy-toggle"
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer border-input accent-primary"
                  />
                </div>
                <label
                  htmlFor="privacy-toggle"
                  className="cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1.5 text-sm font-medium leading-none mb-1">
                    {isPrivate ? (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                    {isPrivate ? "Приватно" : "Јавно"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isPrivate
                      ? "Само ти ќе можеш да ја видиш оваа содржина"
                      : "Содржината ќе биде достапна за сите корисници"}
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={stagedFiles.length === 0 || !topic.trim()}
                className="inline-flex items-center justify-center w-full gap-2 px-8 mt-8 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl"
              >
                <Upload className="w-4 h-4" />
                Прикачи содржина
                {stagedFiles.length > 0 && (
                  <span className="ml-1 opacity-75">
                    ({stagedFiles.length})
                  </span>
                )}
              </button>
            </div>
          </div>

          <UploadEntry entries={entries} onRemove={removeEntry} />
        </div>
      </main>
    </div>
  );
}
