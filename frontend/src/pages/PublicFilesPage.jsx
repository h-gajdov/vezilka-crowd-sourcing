import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Button from "../components/Button.jsx";
import {
  FileText,
  Mic,
  Video,
  Image as ImageIcon,
  Search,
  Download,
  Loader2,
  Calendar,
  Star,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { normalizeUrls } from "../utils/normalizeUrls.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Помошна функција за генерирање на логиката со точки (...) за пагинација
const generatePagination = (currentPage, totalPages) => {
  // currentPage доаѓа како 0-индексирано, но за логикава го користиме како 1-индексирано
  const current = currentPage + 1;
  const total = totalPages;

  // Ако има помалку или точно 7 страници, прикажи ги сите
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Ако сме на почеток
  if (current <= 3) {
    return [1, 2, 3, 4, "...", total - 1, total];
  }

  // Ако сме на крај
  if (current >= total - 2) {
    return [1, 2, "...", total - 3, total - 2, total - 1, total];
  }

  // Ако сме некаде на средина
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default function PublicFilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isDownloading, setIsDownloading] = useState(null);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Состојба за полето за скокање до одредена страна
  const [jumpPage, setJumpPage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== debouncedSearchTerm) {
        setDebouncedSearchTerm(searchTerm);
        setPageNumber(0);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  useEffect(() => {
    fetchPublicFiles();
  }, [pageNumber, pageSize, debouncedSearchTerm]);

  const fetchPublicFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BACKEND_URL}/api/content/public?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${encodeURIComponent(debouncedSearchTerm)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch public files");
      const data = await res.json();

      if (data.content) {
        setFiles(data.content);
        setTotalPages(data.totalPages || 1);
      } else {
        setFiles(data);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Грешка при вчитување:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconConfig = (type) => {
    switch (type) {
      case "TEXT":
        return {
          Icon: FileText,
          color: "text-primary",
          bg: "bg-primary/10",
          label: "Текст",
        };
      case "AUDIO":
        return {
          Icon: Mic,
          color: "text-warning",
          bg: "bg-warning/10",
          label: "Аудио",
        };
      case "VIDEO":
        return {
          Icon: Video,
          color: "text-destructive",
          bg: "bg-destructive/10",
          label: "Видео",
        };
      case "IMAGE":
        return {
          Icon: ImageIcon,
          color: "text-accent",
          bg: "bg-accent/10",
          label: "Слика",
        };
      default:
        return {
          Icon: FileText,
          color: "text-muted-foreground",
          bg: "bg-muted",
          label: type,
        };
    }
  };

  const handleDownload = async (fileId, originalFileName, topic) => {
    if (!fileId) return;
    try {
      setIsDownloading(fileId);
      const downloadApiUrl = `${BACKEND_URL}/api/content/download?id=${fileId}`;
      const res = await fetch(downloadApiUrl);
      if (!res.ok) throw new Error("Датотеката не може да се преземе.");

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = originalFileName || topic || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Грешка при преземање:", error);
      alert("Настана грешка при преземањето на датотеката.");
    } finally {
      setIsDownloading(null);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageNumber(0);
  };

  const handleJumpToPage = (e) => {
    if (e.key === "Enter") {
      const val = parseInt(jumpPage);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
        setPageNumber(val - 1);
        setJumpPage(""); // Исчисти го полето откако ќе скокне
      } else {
        alert(`Внеси број од 1 до ${totalPages}`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 md:pt-32">
        <div className="max-w-6xl p-6 mx-auto md:p-8">
          <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Јавни податоци</h1>
              <p className="mt-1 text-muted-foreground">
                Прегледај и преземи јавно достапни податоци
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Пребарај..."
                className="flex w-full h-10 px-3 py-2 pl-10 text-base border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : files.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {files.map((file) => {
                  const { Icon, color, bg, label } = getIconConfig(file.type);
                  const isCurrentDownloading = isDownloading === file.id;

                  return (
                    <div
                      key={file.id}
                      className="flex flex-col h-full p-5 border bg-card border-border rounded-2xl card-elevated"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2.5 rounded-xl ${bg} ${color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md">
                          {label}
                        </span>
                      </div>

                      <h3
                        className="text-lg font-semibold line-clamp-1"
                        title={file.topic}
                      >
                        {file.topic || "Без наслов"}
                      </h3>

                      {file.originalFileName && (
                        <p
                          className="mt-1 text-xs font-medium truncate text-primary/80"
                          title={file.originalFileName}
                        >
                          {file.originalFileName}
                        </p>
                      )}

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1 min-h-[2.5rem]">
                        {file.description ||
                          "Нема додадено опис за оваа содржина."}
                      </p>

                      <div className="mt-5 mb-5 text-xs text-muted-foreground">
                        {/* Uploader row */}
                        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/50 mb-3">
                          {file.avatarUrl ? (
                            <img
                              src={normalizeUrls(file.avatarUrl)}
                              alt={file.uploaderFullName || "Avatar"}
                              className="object-cover rounded-full w-7 h-7 ring-2 ring-border shrink-0"
                            />
                          ) : (
                            <div className="flex items-center justify-center text-xs font-semibold rounded-full w-7 h-7 bg-primary/15 text-primary ring-2 ring-border shrink-0">
                              {(file.uploaderFullName || "П")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] text-muted-foreground leading-none mb-0.5">
                              Поставено од
                            </span>
                            <span className="text-xs font-medium leading-none truncate text-foreground">
                              {file.uploaderFullName || "Петко Петковски"}
                            </span>
                          </div>
                        </div>

                        {/* Dialect + meta row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-foreground">
                              Дијалект:
                            </span>
                            <span>{file.dialect?.name || "Стандарден"}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-warning" />
                            <span>{(file.qualityScore || 0).toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {new Date(file.createdAt).toLocaleDateString(
                                "mk-MK",
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() =>
                          handleDownload(
                            file.id,
                            file.originalFileName,
                            file.topic,
                          )
                        }
                        disabled={isCurrentDownloading}
                        className="w-full mt-auto"
                        variant="outline"
                      >
                        {isCurrentDownloading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4 mr-2" />
                        )}
                        {isCurrentDownloading ? "Се презема..." : "Преземи"}
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Комплетна пагинација (Димензии, Бројки и Скокање) */}
              <div className="flex flex-col items-center justify-between gap-6 p-5 mt-10 border xl:flex-row bg-card border-border rounded-xl">
                {/* Избор на елементи по страница */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <label htmlFor="pageSizeSelect" className="font-medium">
                    Прикажи по:
                  </label>
                  <select
                    id="pageSizeSelect"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="px-3 py-1 pr-8 border rounded-md appearance-none cursor-pointer h-9 border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-4 h-4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9' /%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.5rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                    <option value={96}>96</option>
                  </select>
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    {/* Бројки и копчиња за страници */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPageNumber((p) => Math.max(0, p - 1))}
                        disabled={pageNumber === 0 || loading}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      {generatePagination(pageNumber, totalPages).map(
                        (page, index) =>
                          page === "..." ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="px-2 text-muted-foreground"
                            >
                              ...
                            </span>
                          ) : (
                            <Button
                              key={page}
                              variant={
                                pageNumber + 1 === page ? "default" : "ghost"
                              }
                              size="icon"
                              onClick={() => setPageNumber(page - 1)}
                              disabled={loading}
                            >
                              {page}
                            </Button>
                          ),
                      )}

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setPageNumber((p) => Math.min(totalPages - 1, p + 1))
                        }
                        disabled={pageNumber >= totalPages - 1 || loading}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Скокни до одредена страница */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Оди на:</span>
                      <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={jumpPage}
                        onChange={(e) => setJumpPage(e.target.value)}
                        onKeyDown={handleJumpToPage}
                        className="w-16 px-2 text-center border rounded-md h-9 border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="#"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center border border-dashed rounded-2xl border-border bg-card/50">
              <div className="p-4 mb-4 rounded-full bg-muted">
                <Inbox className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Не се пронајдени датотеки</h3>
              <p className="max-w-sm mx-auto mt-1 text-sm text-muted-foreground">
                Нема јавни податоци кои одговараат на твоето пребарување. Обиди
                се со други клучни зборови.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
