import { FileText, Mic, Video, Inbox } from "lucide-react";

const iconMap = {
  file: FileText,
  mic: Mic,
  video: Video,
};

const mockActivities = [
  {
    id: 1,
    type: "file",
    title: "Прикачи текстуален документ",
    time: "пред 2 часа",
  },
  {
    id: 2,
    type: "mic",
    title: "Прегледа аудио примерок",
    time: "пред 5 часа",
  },
  {
    id: 3,
    type: "video",
    title: "Прикачи видео исечок",
    time: "пред 1 ден",
  },
  {
    id: 4,
    type: "file",
    title: "Прегледа 3 текстуални придонеси",
    time: "пред 2 дена",
  },
];

export default function RecentActivities({ activities = mockActivities }) {
  const isEmpty = !activities || activities.length === 0;

  return (
    <div className="p-6 border bg-card border-border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Последни активности</h2>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="p-3 mb-3 rounded-full bg-muted">
            <Inbox className="w-5 h-5 text-muted-foreground" />
          </div>

          <p className="text-sm font-medium">Нема активности сè уште</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Кога ќе започнеш да прикачуваш податоци на страната, тука ќе се
            појави историја од вашите последни активности.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type] || FileText;

            return (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
