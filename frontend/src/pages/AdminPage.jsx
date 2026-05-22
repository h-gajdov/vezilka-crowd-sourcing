import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge.jsx";
import { useNavigate } from "react-router-dom";

import {
  CheckCircle2,
  Clock3,
  FileText,
  Mic,
  Video,
  ChevronRight,
  Inbox,
} from "lucide-react";

const pendingDocuments = {
  text: [
    {
      title: "Македонски дијалекти",
      date: "12 Мај 2026",
      status: "pending",
    },
    {
      title: "Истражување за AI",
      date: "10 Мај 2026",
      status: "pending",
    },
  ],
  audio: [
    {
      title: "Аудио интервју",
      date: "9 Мај 2026",
      status: "pending",
    },
  ],
  video: [
    {
      title: "Видео презентација",
      date: "7 Мај 2026",
      status: "pending",
    },
  ],
};

const checkedDocuments = {
  text: [
    {
      title: "Историја на Македонија",
      date: "1 Мај 2026",
      status: "approved",
    },
  ],
  audio: [
    {
      title: "Подкаст епизода",
      date: "28 Апр 2026",
      status: "approved",
    },
  ],
  video: [
    {
      title: "Едукативно видео",
      date: "25 Апр 2026",
      status: "rejected",
    },
  ],
};

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

  const totalPending =
    pendingDocuments.text.length +
    pendingDocuments.audio.length +
    pendingDocuments.video.length;

  const totalChecked =
    checkedDocuments.text.length +
    checkedDocuments.audio.length +
    checkedDocuments.video.length;

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

              <div className="grid gap-6 md:grid-cols-2">
                <SectionCard
                  title="Документи за проверка"
                  Icon={Clock3}
                  count={totalPending}
                  color="bg-warning/10 text-warning"
                  onClick={() => setActiveSection("pending")}
                />

                <SectionCard
                  title="Проверени документи"
                  Icon={CheckCircle2}
                  count={totalChecked}
                  color="bg-primary/10 text-primary"
                  onClick={() => setActiveSection("checked")}
                />
              </div>
            </>
          )}

          {activeSection && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {activeSection === "pending"
                      ? "Документи за проверка"
                      : "Проверени документи"}
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
                      : checkedDocuments.text
                  }
                />

                <DocumentGroup
                  title="Аудио документи"
                  Icon={Mic}
                  documents={
                    activeSection === "pending"
                      ? pendingDocuments.audio
                      : checkedDocuments.audio
                  }
                />

                <DocumentGroup
                  title="Видео документи"
                  Icon={Video}
                  documents={
                    activeSection === "pending"
                      ? pendingDocuments.video
                      : checkedDocuments.video
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