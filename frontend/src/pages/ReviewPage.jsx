import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ReviewPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Преглед на {type} #{id}
      </h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        {type === "document" && (
          <p className="text-gray-700">
            Пример текст
          </p>
        )}

        {type === "audio" && (
          <audio controls className="w-full">
            <source src="/sample-audio.mp3" />
          </audio>
        )}

        {type === "video" && (
          <video controls className="w-full rounded">
            <source src="/sample-video.mp4" />
          </video>
        )}
      </div>

      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        placeholder="Write report or notes..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          ✔ Mark as Checked
        </button>

        <button
          onClick={() => {
            alert("Reported: " + comment);
            navigate("/admin");
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          ⚠ Report
        </button>

      </div>

    </div>
  );
}