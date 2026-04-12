"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAdminAction } from "@/actions/admin.action";
import { ShieldCheck, User, Loader2 } from "lucide-react";

export default function CreateAdmin() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const res = await createAdminAction({ ...value, role });
        if (!res.ok) throw new Error(res.message);
        router.push("/super-admin-dashboard/admins");
        toast.success(res.message);
        form.reset();
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundColor: "#f0ede4",
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(0,0,0,0.06) 39px,rgba(0,0,0,0.06) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(0,0,0,0.06) 39px,rgba(0,0,0,0.06) 40px)",
      }}
    >
      <div
        className="w-full max-w-[480px] overflow-hidden"
        style={{
          background: "#f8f6f0",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "12px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          className="px-8 py-6"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p
            className="flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase mb-3"
            style={{ color: "#0db8c4" }}
          >
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 1,
                background: "#0db8c4",
              }}
            />
            Admin provisioning
          </p>
          <h1
            className="text-[22px] font-bold tracking-tight leading-tight"
            style={{ color: "#1a1a1a" }}
          >
            Create <span style={{ color: "#0db8c4" }}>administrator</span>
          </h1>
          <p className="text-sm font-light mt-1" style={{ color: "#888" }}>
            Provision a new admin or super admin account.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-5"
          >
            {/* Role toggle */}
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-[11px] font-medium tracking-wide uppercase"
                style={{ color: "#666" }}
              >
                Role
              </Label>
              <div
                className="grid grid-cols-2 h-[46px] p-1 gap-1 rounded-xl"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              >
                {(["ADMIN", "SUPERADMIN"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className="flex items-center justify-center gap-1.5 rounded-lg text-[13px] transition-all"
                    style={
                      role === r
                        ? {
                            background: "rgba(13,184,196,0.12)",
                            color: "#0a9ea8",
                            border: "1px solid rgba(13,184,196,0.3)",
                            fontWeight: 500,
                          }
                        : { color: "#999" }
                    }
                  >
                    {r === "ADMIN" ? <User size={12} /> : <ShieldCheck size={12} />}
                    {r === "ADMIN" ? "Admin" : "Super Admin"}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Name is required" : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[11px] font-medium tracking-wide uppercase"
                    style={{ color: "#666" }}
                  >
                    Full name
                  </Label>
                  <Input
                    placeholder="Alex Chen"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-[46px] rounded-xl"
                    style={{
                      background: "#fff",
                      border:
                        field.state.meta.errors?.length
                          ? "1px solid #e55"
                          : "1px solid rgba(0,0,0,0.12)",
                      color: "#1a1a1a",
                    }}
                  />
                  {field.state.meta.errors?.length ? (
                    <span className="text-[11.5px]" style={{ color: "#c0392b" }}>
                      {field.state.meta.errors[0]}
                    </span>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Email */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Email is required" : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[11px] font-medium tracking-wide uppercase"
                    style={{ color: "#666" }}
                  >
                    Email address
                  </Label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-[46px] rounded-xl"
                    style={{
                      background: "#fff",
                      border:
                        field.state.meta.errors?.length
                          ? "1px solid #e55"
                          : "1px solid rgba(0,0,0,0.12)",
                      color: "#1a1a1a",
                    }}
                  />
                  {field.state.meta.errors?.length ? (
                    <span className="text-[11.5px]" style={{ color: "#c0392b" }}>
                      {field.state.meta.errors[0]}
                    </span>
                  ) : null}
                </div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Password is required"
                    : value.length < 6
                    ? "Minimum 6 characters"
                    : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-[11px] font-medium tracking-wide uppercase"
                    style={{ color: "#666" }}
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Min. 6 characters"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="h-[46px] rounded-xl"
                    style={{
                      background: "#fff",
                      border:
                        field.state.meta.errors?.length
                          ? "1px solid #e55"
                          : "1px solid rgba(0,0,0,0.12)",
                      color: "#1a1a1a",
                    }}
                  />
                  {field.state.meta.errors?.length ? (
                    <span className="text-[11.5px]" style={{ color: "#c0392b" }}>
                      {field.state.meta.errors[0]}
                    </span>
                  ) : null}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] mt-1 rounded-xl text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2"
              style={{ background: "#0db8c4", color: "#fff", border: "none" }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <ShieldCheck size={15} />
                  {role === "SUPERADMIN" ? "Create Super Admin" : "Create Admin"}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}