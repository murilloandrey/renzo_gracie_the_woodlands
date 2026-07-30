import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.webp";
import { Seo } from "@/components/Seo";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  const [pw, setPw] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-6 text-bone">
      <Seo
        title="Staff Admin"
        description="Staff admin for Renzo Gracie The Woodlands."
        path="/admin"
        noindex
      />
      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className="w-full max-w-sm text-center"
      >
        <img src={logo} alt="" className="logo-white mx-auto h-14 w-14" />
        <h1 className="font-display mt-8 text-4xl">Staff Admin</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Enter the admin password to manage the schedule, Instagram tiles, and trial leads.
        </p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className="mt-8 w-full rounded-sm border border-input bg-obsidian-elev px-4 py-3 text-sm focus:border-primary focus:outline-none"
        />
        <button type="submit" className="btn-primary mt-4 w-full">Enter</button>
      </form>
    </div>
  );
}
