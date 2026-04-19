import { FileText, Music, Video } from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  document: <FileText className="w-6 h-6" />,
  audio: <Music className="w-6 h-6" />,
  video: <Video className="w-6 h-6" />,
};

export default function ContentCard({ item }) {
  return (
    <Link
      to={`/admin/review/${item.type}/${item.id}`}
      className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-gray-700">{iconMap[item.type]}</div>
        <h3 className="font-semibold">{item.title}</h3>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2">
        {item.description}
      </p>

      <span className="text-xs text-gray-400 mt-3 block">
        Status: Pending review
      </span>
    </Link>
  );
}