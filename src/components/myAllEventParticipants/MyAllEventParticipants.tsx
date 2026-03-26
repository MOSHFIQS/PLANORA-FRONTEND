
import { Participant } from "@/types/participant.types";


const MyAllEventParticipants = ({ participants }: { participants: Participant[] }) => {
  if (!participants || participants.length === 0) {
    return <p>No participants found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">All Participants</h2>
      <div className="grid gap-4">
        {participants.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 border rounded-md shadow-sm"
          >
            <img
              src={p.user.image}
              alt={p.user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{p.user.name}</h3>
              <p className="text-sm text-gray-500">{p.user.email}</p>
              <p className="text-sm">
                Event: <span className="font-semibold">{p.event.title}</span>
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${p.status === "APPROVED"
                      ? "text-green-600"
                      : p.status === "PENDING"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                >
                  {p.status}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Joined: {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAllEventParticipants;