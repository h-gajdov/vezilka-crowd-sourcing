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
import { getUser } from "../utils/auth";
import { useEffect, useState } from "react";
import { getUserDashboardStats } from "../api/userApi";

export default function DashboardPage() {
  const user = getUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDashboardStats();
      setStats(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <div className="flex min-h-screen bg-background">
      <Sidebar></Sidebar>
      <main className="flex-1 pb-20 overflow-auto lg:pb-0 pt-14 lg:pt-0">
        <div className="max-w-6xl p-6 mx-auto md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold md:text-3xl">
              Добредојде назад, {user.firstName} 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Еве преглед на твоите придонеси
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
            <StatCard
              title="Вкупно поени"
              statValue={stats.totalPoints}
              Icon={Star}
              bgClass="bg-warning/10"
              textClass="text-warning"
              i={0}
            ></StatCard>
            <StatCard
              title="Прикачувања"
              statValue={stats.totalUploads}
              Icon={Upload}
              bgClass="bg-primary/10"
              textClass="text-primary"
              i={1}
            ></StatCard>
            <StatCard
              title="Достапни награди"
              statValue={stats.totalRewards}
              Icon={Gift}
              bgClass="bg-accent/10"
              textClass="text-accent"
              i={2}
            ></StatCard>
            <StatCard
              title="Ранг"
              statValue={"#" + stats.rank}
              Icon={Star}
              bgClass="bg-destructive/10"
              textClass="text-destructive"
              i={3}
            ></StatCard>
          </div>
          <div className="flex gap-4 mb-8 md:grid-cols-2">
            <a className="flex-1 block" href="/upload">
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
