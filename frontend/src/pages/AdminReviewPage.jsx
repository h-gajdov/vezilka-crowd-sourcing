import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { useLocation, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    FileText,
    Mic,
    Video,
    CheckCircle2,
    XCircle,
    Calendar,
    User,
} from "lucide-react";


const typeIcons = {
    TEXT: FileText,
    AUDIO: Mic,
    VIDEO: Video,
};

export default function AdminReviewPage() {

    const [status, setStatus] = useState("pending");
    const [comment, setComment] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const document = location.state?.document;

    if (!document) {
        return (
            <div className="p-10 text-center text-muted-foreground">
                No document selected
                <div className="mt-4">
                    <button
                        onClick={() => navigate("/admin")}
                        className="px-4 py-2 border rounded-xl"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }


    const Icon = typeIcons[document?.type] || FileText;

    const handleApprove = () => {
        setStatus("approved");

        console.log({
            action: "approved",
            comment,
        });
    };

    const handleReject = () => {
        setStatus("rejected");

        console.log({
            action: "rejected",
            comment,
        });
    };

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar activeButtonIndex={5} />

            <main className="flex-1 pb-20 overflow-auto lg:pb-0 pt-14 lg:pt-0">
                <div className="max-w-5xl p-6 mx-auto md:p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="outline" to="/admin">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад
                        </Button>

                        <div>
                            <h1 className="text-2xl font-bold md:text-3xl">
                                Преглед на документ
                            </h1>

                            <p className="text-muted-foreground">
                                Администраторска проверка на документ
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <div className="p-6 border bg-card border-border rounded-2xl card-elevated">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                {document.title}
                                            </h2>

                                            <p className="text-sm text-muted-foreground">
                                                {document.type}
                                            </p>
                                        </div>
                                    </div>

                                    <Badge
                                        variant={
                                            status === "approved"
                                                ? "default"
                                                : status === "rejected"
                                                    ? "destructive"
                                                    : "secondary"
                                        }
                                    >
                                        {status}
                                    </Badge>
                                </div>

                                <div className="grid gap-4 mt-8 md:grid-cols-2">
                                    <div className="flex items-center gap-3 text-sm">
                                        <User className="w-4 h-4 text-muted-foreground" />

                                        <span>{document.uploadedBy}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />

                                        <span>{document.uploadedAt}</span>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="mb-2 font-semibold">
                                        Опис на документот
                                    </h3>

                                    <div className="p-4 border rounded-xl bg-muted/30 border-border">
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {document.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border bg-card border-border rounded-2xl card-elevated">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Преглед на содржина
                                </h3>

                                {document.type === "TEXT" && (
                                    <div className="p-4 border rounded-xl border-border bg-muted/20">
                                        <p className="text-sm leading-relaxed">
                                            Овде ќе се прикаже текстуалната содржина на документот.
                                        </p>
                                    </div>
                                )}

                                {document.type === "AUDIO" && (
                                    <div className="p-4 border rounded-xl border-border bg-muted/20">
                                        <audio controls className="w-full">
                                            <source src="/sample-audio.mp3" type="audio/mpeg" />
                                        </audio>
                                    </div>
                                )}

                                {document.type === "VIDEO" && (
                                    <div className="p-4 border rounded-xl border-border bg-muted/20">
                                        <video controls className="w-full rounded-xl">
                                            <source src="/sample-video.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 border bg-card border-border rounded-2xl card-elevated">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Коментар од администратор
                                </h3>

                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Остави коментар..."
                                    className="w-full min-h-[160px] rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                                />

                                <div className="grid gap-3 mt-6">
                                    <button
                                        onClick={handleApprove}
                                        className="flex items-center justify-center gap-2 px-4 py-3 font-medium text-white transition-colors rounded-xl bg-primary hover:opacity-90"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Прифати документ
                                    </button>

                                    <button
                                        onClick={handleReject}
                                        className="flex items-center justify-center gap-2 px-4 py-3 font-medium text-white transition-colors rounded-xl bg-destructive hover:opacity-90"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Одбиј документ
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 border bg-card border-border rounded-2xl card-elevated">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Информации
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Тип</span>

                                        <span>{document.type}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Статус</span>

                                        <Badge
                                            variant={
                                                status === "approved"
                                                    ? "default"
                                                    : status === "rejected"
                                                        ? "destructive"
                                                        : "secondary"
                                            }
                                        >
                                            {status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}