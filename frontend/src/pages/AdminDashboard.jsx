import ContentCard from "../components/ContentCard";

const mockData = [
  { id: 1, type: "document", title: "Transcript A", description: "Interview transcript about dialect research..." },
  { id: 2, type: "audio", title: "Audio Sample 1", description: "Recorded conversation in local dialect..." },
  { id: 3, type: "video", title: "Video Clip 1", description: "Short video with spoken dialogue..." },
  { id: 4, type: "document", title: "Transcript B", description: "Another document sample..." },
];

export default function AdminDashboard() {
  const documents = mockData.filter(i => i.type === "document");
  const audio = mockData.filter(i => i.type === "audio");
  const video = mockData.filter(i => i.type === "video");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">Добредојдовте назад</h1>
      <h3 className="text-3xl font-bold mb-8">Имате улога на администратор</h3>
      <Section title="Текстуални документи" items={documents} />
      <Section title="Аудио" items={audio} />
      <Section title="Видео" items={video} />

    </div>
  );
}

function Section({ title, items }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}