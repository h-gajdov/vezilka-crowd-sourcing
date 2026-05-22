import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPendingDocuments, getRejectedDocuments, getApprovedDocuments } from "../api/userApi";
import { XCircle } from "lucide-react";

import {
    CheckCircle2,
    Clock3,
    FileText,
    Mic,
    Video,
    ChevronRight,
    Inbox,
} from "lucide-react";

function SectionCard({ title, Icon, count, onClick, color }) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left transition-all duration-200 border bg-card border-border rounded-2xl card-elevated hover:scale-[1.01] hover:bg-muted/30"
        >
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${color}`}>
                        <Icon className="w-6 h-6" />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {count} документи
                        </p>
                    </div>
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
        </button>
    );
}

function DocumentGroup({ title, Icon, documents }) {
    const navigate = useNavigate();

    return (
        <div className="p-6 border bg-card border-border rounded-2xl card-elevated">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                </div>

                <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            <div className="space-y-3">
                {documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <Inbox className="w-5 h-5 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            Нема документи
                        </p>
                    </div>
                ) : (
                    documents.map((doc, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 transition-colors rounded-xl bg-muted/40 hover:bg-muted/60"
                        >
                            <div>
                                <h4 className="font-medium">{doc.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {doc.date}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Badge
                                    variant={
                                        doc.status === "approved"
                                            ? "default"
                                            : doc.status === "rejected"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                >
                                    {doc.status}
                                </Badge>

                                <button
                                    onClick={() =>
                                        navigate("/admin/review", {
                                            state: { document: doc },
                                        })
                                    }
                                    className="px-3 py-1 text-sm border rounded-lg bg-card hover:bg-muted"
                                >
                                    Review
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function AdminPage() {
    const [activeSection, setActiveSection] = useState(null);
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [rejected, setRejected] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const pen = await getPendingDocuments();
            const appr = await getApprovedDocuments();
            const rej = await getRejectedDocuments();
            setPending(pen);
            setApproved(appr);
            setRejected(rej);
        } catch (err) {
            console.error(err);
        }
    };

    const approvedDocuments = {
        text: approved.filter(d => d.type === "TEXT"),
        audio: approved.filter(d => d.type === "AUDIO"),
        video: approved.filter(d => d.type === "VIDEO"),
        image: approved.filter(d => d.type === "IMAGE"),
    };

    const rejectedDocuments = {
        text: rejected.filter(d => d.type === "TEXT"),
        audio: rejected.filter(d => d.type === "AUDIO"),
        video: rejected.filter(d => d.type === "VIDEO"),
        image: rejected.filter(d => d.type === "IMAGE"),
    };

    const pendingDocuments = {
        text: pending.filter(d => d.type === "TEXT"),
        audio: pending.filter(d => d.type === "AUDIO"),
        video: pending.filter(d => d.type === "VIDEO"),
        image: pending.filter(d => d.type === "IMAGE")
    };

    const totalPending =
        pendingDocuments.text.length +
        pendingDocuments.audio.length +
        pendingDocuments.video.length +
        pendingDocuments.image.length;

    const totalChecked =
        approvedDocuments.text.length +
        approvedDocuments.audio.length +
        approvedDocuments.video.length +
        approvedDocuments.image.length +
        rejectedDocuments.text.length +
        rejectedDocuments.audio.length +
        rejectedDocuments.video.length +
        rejectedDocuments.image.length;

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar activeButtonIndex={5} />

            <main className="flex-1 pb-20 overflow-auto lg:pb-0 pt-14 lg:pt-0">
                <div className="max-w-6xl p-6 mx-auto md:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold md:text-3xl">
                            Преглед и проверка
                        </h1>

                        <p className="mt-1 text-muted-foreground">
                            Управување со документи
                        </p>
                    </div>

                    {!activeSection && (
                        <>
                            <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
                                <StatCard
                                    title="Проверени"
                                    statValue={totalChecked}
                                    Icon={CheckCircle2}
                                    bgClass="bg-primary/10"
                                    textClass="text-primary"
                                    i={0}
                                />

                                <StatCard
                                    title="Чекаат проверка"
                                    statValue={totalPending}
                                    Icon={Clock3}
                                    bgClass="bg-warning/10"
                                    textClass="text-warning"
                                    i={1}
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 mb-8">
                                <SectionCard
                                    title="Документи за проверка"
                                    Icon={Clock3}
                                    count={totalPending}
                                    color="bg-warning/10 text-warning"
                                    onClick={() => setActiveSection("pending")}
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 mb-8">
                                <SectionCard
                                    title="Одобрени документи"
                                    Icon={CheckCircle2}
                                    count={
                                        approvedDocuments.text.length +
                                        approvedDocuments.audio.length +
                                        approvedDocuments.video.length +
                                        approvedDocuments.image.length
                                    }
                                    color="bg-primary/10 text-primary"
                                    onClick={() => setActiveSection("approved")}
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 mb-8">
                                <SectionCard
                                    title="Одбиени документи"
                                    Icon={XCircle}
                                    count={
                                        rejectedDocuments.text.length +
                                        rejectedDocuments.audio.length +
                                        rejectedDocuments.video.length +
                                        rejectedDocuments.image.length
                                    }
                                    color="bg-destructive/10 text-destructive"
                                    onClick={() => setActiveSection("rejected")}
                                />
                            </div>
                        </>
                    )}

                    {activeSection && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {activeSection === "pending" && "Документи за проверка"}
                                        {activeSection === "approved" && "Одобрени документи"}
                                        {activeSection === "rejected" && "Одбиени документи"}
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Документите се организирани по тип
                                    </p>
                                </div>

                                <button
                                    onClick={() => setActiveSection(null)}
                                    className="px-4 py-2 text-sm transition-colors border rounded-xl border-border bg-card hover:bg-muted"
                                >
                                    Назад
                                </button>
                            </div>

                            <div className="grid gap-6">
                                <DocumentGroup
                                    title="Текст документи"
                                    Icon={FileText}
                                    documents={
                                        activeSection === "pending"
                                            ? pendingDocuments.text
                                            : activeSection === "approved"
                                                ? approvedDocuments.text
                                                : rejectedDocuments.text
                                    }
                                />

                                <DocumentGroup
                                    title="Аудио документи"
                                    Icon={Mic}
                                    documents={
                                        activeSection === "pending"
                                            ? pendingDocuments.audio
                                            : activeSection === "approved"
                                                ? approvedDocuments.audio
                                                : rejectedDocuments.audio
                                    }
                                />

                                <DocumentGroup
                                    title="Видео документи"
                                    Icon={Video}
                                    documents={
                                        activeSection === "pending"
                                            ? pendingDocuments.video
                                            : activeSection === "approved"
                                                ? approvedDocuments.video
                                                : rejectedDocuments.video
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}