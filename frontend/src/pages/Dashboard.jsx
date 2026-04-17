import {
  Star,
  Upload,
  Gift,
  SquareCheckBig,
  Mic,
  FileText,
  Video,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import RecentActivities from "../components/RecentActivities";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar></Sidebar>
      <main className="flex-1 pb-20 overflow-auto lg:pb-0 pt-14 lg:pt-0">
        <div className="max-w-6xl p-6 mx-auto md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold md:text-3xl">
              Добредојде назад, Марко 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Еве преглед на твоите придонеси
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
            <StatCard
              title="Вкупно поени"
              statValue={2450}
              Icon={Star}
              bgClass="bg-warning/10"
              textClass="text-warning"
            ></StatCard>
            <StatCard
              title="Прикачувања"
              statValue={87}
              Icon={Upload}
              bgClass="bg-primary/10"
              textClass="text-primary"
            ></StatCard>
            <StatCard
              title="Достапни награди"
              statValue={134}
              Icon={Gift}
              bgClass="bg-accent/10"
              textClass="text-accent"
            ></StatCard>
            <StatCard
              title="Ранг"
              statValue={"#42"}
              Icon={Star}
              bgClass="bg-destructive/10"
              textClass="text-destructive"
            ></StatCard>
          </div>
          <div className="flex gap-4 mb-8 md:grid-cols-2">
            <a className="flex-1 block" href="#">
              <div className="flex items-center gap-4 p-6 border bg-card border-border rounded-xl card-elevated">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Upload />
                </div>
                <div>
                  <h3 className="font-semibold">Прикачи содржина</h3>
                  <p className="text-sm text-muted-foreground">
                    Сподели текст, аудио или видео податоци
                  </p>
                </div>
              </div>
            </a>
            <a className="flex-1 block" href="#">
              {/* This button will only be available for admins */}
              <div className="flex items-center gap-4 p-6 border bg-card border-border rounded-xl card-elevated">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <SquareCheckBig />
                </div>
                <div>
                  <h3 className="font-semibold">Прегледај содржина</h3>
                  <p className="text-sm text-muted-foreground">
                    Помогни во проверката на поставените податоци
                  </p>
                </div>
              </div>
            </a>
          </div>
          <RecentActivities></RecentActivities>
        </div>
      </main>
    </div>
  );
}
