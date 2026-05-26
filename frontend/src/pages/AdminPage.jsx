import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getPendingDocuments,
  getRejectedDocuments,
  getApprovedDocuments,
  getAllUsersPaginated,
  blockUser,
  unblockUser,
  updateUserRole,
} from "../api/userApi";
import { XCircle } from "lucide-react";

import {
  CheckCircle2,
  Clock3,
  FileText,
  Mic,
  Video,
  ChevronRight,
  ChevronLeft,
  Inbox,
  Users,
  ShieldCheck,
  Ban,
  UnlockKeyhole,
  ChevronDown,
  Search,
} from "lucide-react";
import { formatRelativeTime } from "../utils/formatTime.js";
import { userIsAdmin } from "../utils/auth.js";

const ROLES = ["USER", "ADMIN", "REVIEWER"];

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
            <p className="text-sm text-muted-foreground">{count} документи</p>
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
            <p className="text-sm text-muted-foreground">Нема документи</p>
          </div>
        ) : (
          documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 transition-colors rounded-xl bg-muted/40 hover:bg-muted/60"
            >
              <div>
                <h4 className="font-medium">{doc.topic}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatRelativeTime(doc.createdAt)}
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
                  {doc.status == "PENDING"
                    ? "Непрегледано"
                    : doc.status == "APPROVED"
                      ? "Прифатено"
                      : "Одбиено"}
                </Badge>

                <button
                  onClick={() =>
                    navigate("/admin/review", {
                      state: {
                        document: {
                          id: doc.id,
                          title: doc.originalFileName || doc.topic,
                          type: doc.type,
                          fileUrl: doc.fileUrl,
                          status: doc.status,
                          description: doc.description,
                          uploadedBy: doc.uploader.email,
                          createdAt: formatRelativeTime(doc.createdAt),
                        },
                      },
                    })
                  }
                  className="px-3 py-1 text-sm border rounded-lg bg-card hover:bg-muted"
                >
                  Прегледај
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function RoleDropdown({ currentRole, userId, onRoleChange, disabled = false }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAdmin = currentRole === "ADMIN";

  const handleSelect = async (role) => {
    if (role === currentRole) {
      setOpen(false);
      return;
    }
    setLoading(true);
    setOpen(false);
    try {
      await onRoleChange(userId, role);
    } finally {
      setLoading(false);
    }
  };

  const roleStyles = {
    ADMIN: "bg-primary/10 text-primary",
    REVIEWER: "bg-warning/10 text-warning",
    USER: "bg-muted text-muted-foreground",
  };

  return (
    <div className="relative">
      <button
        onClick={() => !isAdmin && setOpen((v) => !v)}
        disabled={loading || disabled || isAdmin}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium border border-border transition-colors ${
          isAdmin ? "opacity-60 cursor-not-allowed" : "hover:bg-muted/60"
        } ${roleStyles[currentRole] ?? "bg-muted text-muted-foreground"}`}
      >
        {loading ? (
          <span className="w-3 h-3 border-2 border-current rounded-full border-t-transparent animate-spin" />
        ) : (
          <>
            <ShieldCheck className="w-3.5 h-3.5" />
            {currentRole}
            {!isAdmin && <ChevronDown className="w-3 h-3 opacity-60" />}
          </>
        )}
      </button>

      {open && !isAdmin && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 overflow-hidden border rounded-xl bg-card border-border shadow-lg min-w-[120px]">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => handleSelect(role)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted/60 transition-colors ${role === currentRole ? "font-semibold text-primary" : ""}`}
              >
                <ShieldCheck className="w-3.5 h-3.5 opacity-60" />
                {role}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const PAGE_SIZE = 12;

function UserManagementSection({ onBack }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0); // backend is 0-indexed
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0); // reset to first page on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch whenever page or debounced search changes
  useEffect(() => {
    fetchUsers(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const fetchUsers = async (pageNum, searchTerm) => {
    setLoading(true);
    try {
      const result = await getAllUsersPaginated(pageNum, searchTerm);
      setUsers(result.users);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [actionLoading, setActionLoading] = useState({}); // tracks per-user in-flight actions

  const handleBlockToggle = async (user) => {
    setActionLoading((prev) => ({ ...prev, [user.id]: true }));
    try {
      const updated = user.blocked
        ? await unblockUser(user.email)
        : await blockUser(user.email);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, blocked: updated.blocked } : u,
        ),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [user.id]: false }));
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const updated = await updateUserRole(user.email, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: updated.role } : u)),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const displayPage = page + 1; // 1-indexed for display
  const rangeStart = page * PAGE_SIZE + 1;
  const rangeEnd = Math.min((page + 1) * PAGE_SIZE, totalElements);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Управување со корисници</h2>
          <p className="text-sm text-muted-foreground">
            Блокирање, одблокирање и менување на улоги
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 text-sm transition-colors border rounded-xl border-border bg-card hover:bg-muted"
        >
          Назад
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Пребарај по е-пошта или ime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-10 pr-4 text-sm border rounded-xl bg-card border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="p-6 border bg-card border-border rounded-2xl card-elevated">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">
              Корисници ({totalElements})
            </h2>
          </div>

          {!loading && totalElements > 0 && (
            <p className="text-sm text-muted-foreground">
              {rangeStart}–{rangeEnd} од {totalElements}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="w-6 h-6 border-2 rounded-full border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">
              Се вчитуваат корисници...
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Inbox className="w-5 h-5 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Нема пронајдени корисници
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 space-y-3">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center relative justify-between p-4 rounded-xl transition-colors ${
                    user.blocked
                      ? "bg-destructive/5 border border-destructive/20"
                      : "bg-muted/40 hover:bg-muted/60"
                  }`}
                >
                  {/* Avatar + Info */}
                  <div className="flex items-center min-w-0 gap-3">
                    <div className="flex items-center justify-center overflow-hidden text-sm font-semibold rounded-full w-9 h-9 bg-primary/10 text-primary shrink-0">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        (
                          user.firstName?.[0] ??
                          user.email?.[0] ??
                          "?"
                        ).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium truncate">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : "—"}
                      </h4>
                      <p className="text-sm truncate text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    {user.blocked && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                        <Ban className="w-3 h-3" />
                        Блокиран
                      </span>
                    )}

                    <RoleDropdown
                      currentRole={user.role}
                      userId={user.id}
                      onRoleChange={handleRoleChange}
                      disabled={!!actionLoading[user.id]}
                    />

                    <button
                      onClick={() => handleBlockToggle(user)}
                      disabled={!!actionLoading[user.id]}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        user.blocked
                          ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                          : "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                      }`}
                    >
                      {actionLoading[user.id] ? (
                        <span className="w-3.5 h-3.5 border-2 border-current rounded-full border-t-transparent animate-spin" />
                      ) : user.blocked ? (
                        <>
                          <UnlockKeyhole className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Одблокирај</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Блокирај</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Претходна
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                        p === page
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {p + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page === totalPages - 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Следна
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState(null);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [showUserManagemenr, setShowUserManagement] = useState(false);

  useEffect(() => {
    loadData();
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const result = await userIsAdmin();
    setShowUserManagement(result);
  };

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
    text: approved.filter((d) => d.type === "TEXT"),
    audio: approved.filter((d) => d.type === "AUDIO"),
    video: approved.filter((d) => d.type === "VIDEO"),
    image: approved.filter((d) => d.type === "IMAGE"),
  };

  const rejectedDocuments = {
    text: rejected.filter((d) => d.type === "TEXT"),
    audio: rejected.filter((d) => d.type === "AUDIO"),
    video: rejected.filter((d) => d.type === "VIDEO"),
    image: rejected.filter((d) => d.type === "IMAGE"),
  };

  const pendingDocuments = {
    text: pending.filter((d) => d.type === "TEXT"),
    audio: pending.filter((d) => d.type === "AUDIO"),
    video: pending.filter((d) => d.type === "VIDEO"),
    image: pending.filter((d) => d.type === "IMAGE"),
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
      <Sidebar activeButtonIndex={2} />

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

          {/* ── Home: no active section ── */}
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

              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <SectionCard
                  title="Документи за проверка"
                  Icon={Clock3}
                  count={totalPending}
                  color="bg-warning/10 text-warning"
                  onClick={() => setActiveSection("pending")}
                />
              </div>

              <div className="grid gap-6 mb-8 md:grid-cols-2">
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

              <div className="grid gap-6 mb-8 md:grid-cols-2">
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

              {/* ── User Management card ── */}
              {showUserManagemenr && (
                <div className="grid gap-6 mb-8 md:grid-cols-2">
                  <button
                    onClick={() => setActiveSection("users")}
                    className="w-full text-left transition-all duration-200 border bg-card border-border rounded-2xl card-elevated hover:scale-[1.01] hover:bg-muted/30"
                  >
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-secondary/10 text-secondary-foreground">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Управување со корисници
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Блокирај, одблокирај, смени улога
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </button>
                </div>
              )}
            </>
          )}

          {/* ── Document sections ── */}
          {activeSection && activeSection !== "users" && (
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

                <DocumentGroup
                  title="Слики"
                  Icon={Video}
                  documents={
                    activeSection === "pending"
                      ? pendingDocuments.image
                      : activeSection === "approved"
                        ? approvedDocuments.image
                        : rejectedDocuments.image
                  }
                />
              </div>
            </>
          )}

          {/* ── User Management section ── */}
          {activeSection === "users" && (
            <UserManagementSection onBack={() => setActiveSection(null)} />
          )}
        </div>
      </main>
    </div>
  );
}
