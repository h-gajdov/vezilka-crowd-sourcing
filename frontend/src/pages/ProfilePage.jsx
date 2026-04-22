import Badge from "../components/Badge.jsx";
import Button from "../components/Button.jsx";
import Sidebar from "../components/Sidebar";
import {
    User,
    Mail,
    Calendar,
    Star,
    Upload,
    CheckSquare,
    Award,
    FileText,
    Mic,
    Video,
} from "lucide-react";

export default function ProfilePage() {
    const badges = [
        {key: "firstUpload", icon: Upload, earned: true},
        {key: "reviewer", icon: CheckSquare, earned: true},
        {key: "hundredPoints", icon: Star, earned: true},
        {key: "topContributor", icon: Award, earned: false},
    ];

    const contributions = [
        {
            type: "Text",
            title: "Народна приказна",
            date: "Apr 12, 2026",
            status: "approved",
            icon: FileText,
        },
        {
            type: "Audio",
            title: "Разговор за времето",
            date: "Apr 10, 2026",
            status: "pending",
            icon: Mic,
        },
        {
            type: "Video",
            title: "Кратко интервју",
            date: "Apr 8, 2026",
            status: "approved",
            icon: Video,
        },
        {
            type: "Text",
            title: "Рецепт за тавче гравче",
            date: "Apr 5, 2026",
            status: "approved",
            icon: FileText,
        },
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar activeButtonIndex={1}/>
            <div className="mb-8">
                <h1 className="text-2xl font-bold md:text-3xl">Профил</h1>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="p-6 text-center border bg-card border-border rounded-2xl card-elevated">
                        <div
                            className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 text-primary">
                            <User className="w-10 h-10"/>
                        </div>
                        <h2 className="text-xl font-bold">Марко Петров</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Придонесувач</p>

                        <div className="mt-6 space-y-3 text-left">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground"/>
                                <span>marko.petrov@example.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground"/>
                                <span>Се придружи во март 2026</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Star className="w-4 h-4 text-warning"/>
                                <span>2,450 поени · Ранг #42</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full mt-6">
                            Уреди профил
                        </Button>
                    </div>

                    <div className="p-6 mt-6 border bg-card border-border rounded-2xl card-elevated">
                        <h3 className="mb-4 font-semibold">Значки и достигнувања</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {badges.map((badge) => (
                                <div
                                    key={badge.key}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl text-center ${badge.earned ? "bg-primary/5" : "bg-muted opacity-50"}`}
                                >
                                    <badge.icon
                                        className={`h-5 w-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`}
                                    />
                                    <span className="text-xs font-medium">{badge.key}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="p-6 border bg-card border-border rounded-2xl card-elevated">
                        <h3 className="mb-4 font-semibold">Историја на придонеси</h3>
                        <div className="space-y-3">
                            {contributions.map((c, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-3 transition-colors rounded-lg hover:bg-muted/50"
                                >
                                    <div className="p-2 rounded-lg bg-muted">
                                        <c.icon className="w-4 h-4 text-muted-foreground"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{c.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {c.type} · {c.date}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={c.status === "approved" ? "default" : "secondary"}
                                    >
                                        {c.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
