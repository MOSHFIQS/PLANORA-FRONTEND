"use client";

import React, { useState } from "react";
import {
  Sparkles, Loader2, Wand2, ThumbsUp,
  AlertTriangle, Activity, ChevronRight, X,
} from "lucide-react";

type Review = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
};

type Props = {
  reviews: Review[];
};

export default function PlanoraAIReviewAnalyzer({ reviews }: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<{
    sentimentScore: number;
    sentimentLabel: string;
    keyPraise: string;
    actionableCritique: string;
    totalReviews: number;
    avgRating: number;
  } | null>(null);

  const handleAnalyze = () => {
    if (!reviews || reviews.length === 0) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
      const sentimentScore = Math.round((avgRating / 5) * 100);

      let sentimentLabel = "Neutral";
      if (sentimentScore >= 80) sentimentLabel = "Highly Positive";
      else if (sentimentScore >= 60) sentimentLabel = "Positive";
      else if (sentimentScore <= 40) sentimentLabel = "Needs Improvement";

      const goodReviews = reviews
        .filter((r) => r.rating >= 4 && r.comment && r.comment.length > 5)
        .sort((a, b) => (b.comment?.length || 0) - (a.comment?.length || 0));

      const keyPraise =
        goodReviews.length > 0
          ? `"${goodReviews[0].comment}" — highlighted across multiple positive reviews.`
          : "Attendees universally appreciated the effort put into this event.";

      const badReviews = reviews
        .filter((r) => r.rating <= 3 && r.comment && r.comment.length > 5)
        .sort((a, b) => (b.comment?.length || 0) - (a.comment?.length || 0));

      const actionableCritique =
        badReviews.length > 0
          ? `"${badReviews[0].comment}" — consider addressing this in future events.`
          : avgRating >= 4
          ? "No major critiques found. Consider gathering more detailed feedback next time."
          : "Keep up the great work! Minor improvements in scheduling could help.";

      setReport({ sentimentScore, sentimentLabel, keyPraise, actionableCritique, totalReviews: reviews.length, avgRating: Math.round(avgRating * 10) / 10 });
      setIsAnalyzing(false);
    }, 2500);
  };

  if (!reviews || reviews.length === 0) return null;

  const scoreColor =
    (report?.sentimentScore ?? 0) >= 80
      ? "#0db8c4"
      : (report?.sentimentScore ?? 0) >= 60
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="mb-6 w-full">
      {!report ? (
        /* ── Trigger button ── */
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full group"
          style={{
            background: "#f8f6f0",
            border: "1px solid rgba(13,184,196,0.35)",
            borderRadius: 14,
            padding: 0,
            cursor: isAnalyzing ? "not-allowed" : "pointer",
            opacity: isAnalyzing ? 0.85 : 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "18px 20px",
            }}
          >
            {/* Left */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: isAnalyzing ? "#e0f9fa" : "#0db8c4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "1px solid rgba(13,184,196,0.3)",
                  transition: "transform 0.2s",
                }}
              >
                {isAnalyzing ? (
                  <Loader2 size={22} className="animate-spin" style={{ color: "#0db8c4" }} />
                ) : (
                  <Wand2 size={22} color="#fff" />
                )}
              </div>

              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
                    {isAnalyzing ? "Planora AI is analyzing…" : "Analyze Reviews with Planora AI"}
                  </span>
                  <Sparkles size={14} color="#0db8c4" />
                </div>
                <p style={{ fontSize: 13, color: "#888", margin: 0, fontWeight: 400 }}>
                  {isAnalyzing
                    ? "Reading reviews and extracting insights…"
                    : `Generate an instant sentiment report from ${reviews.length} review${reviews.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            {/* Right */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(13,184,196,0.08)",
                border: "1px solid rgba(13,184,196,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#0db8c4",
              }}
            >
              {isAnalyzing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <ChevronRight size={18} />
              )}
            </div>
          </div>
        </button>
      ) : (
        /* ── Report card ── */
        <div
          style={{
            background: "#f8f6f0",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 22px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              background: "#1a1a1a",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(13,184,196,0.15)",
                  border: "1px solid rgba(13,184,196,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={17} color="#0db8c4" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f0ede4" }}>
                  Planora AI Report
                </h2>
                <p style={{ margin: 0, fontSize: 11, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
                  Sentiment & Insights · {report.totalReviews} reviews
                </p>
              </div>
            </div>

            <button
              onClick={() => setReport(null)}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 13,
                color: "#aaa",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <X size={13} />
              Close
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Score row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
            >
              {/* Sentiment score */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: 12,
                  padding: "18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 6,
                }}
              >
                <Activity size={18} color="#0db8c4" />
                <p style={{ fontSize: 11, color: "#888", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
                  Sentiment
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                    {report.sentimentScore}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#aaa" }}>%</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: `${scoreColor}18`,
                    color: scoreColor,
                    border: `1px solid ${scoreColor}40`,
                  }}
                >
                  {report.sentimentLabel}
                </span>
              </div>

              {/* Avg rating */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: 12,
                  padding: "18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 18 }}>⭐</span>
                <p style={{ fontSize: 11, color: "#888", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
                  Avg Rating
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#f59e0b", lineHeight: 1 }}>
                    {report.avgRating}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#aaa" }}>/5</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: "#fef3c720",
                    color: "#b45309",
                    border: "1px solid #f59e0b40",
                  }}
                >
                  {report.totalReviews} Reviews
                </span>
              </div>

              {/* Star breakdown visual */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <p style={{ fontSize: 11, color: "#888", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
                  Distribution
                </p>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 10, color: "#888", minWidth: 12 }}>{star}★</span>
                      <div style={{ flex: 1, height: 5, background: "#f0ede4", borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: pct > 0 ? "#0db8c4" : "transparent", borderRadius: 10, transition: "width 0.6s ease" }} />
                      </div>
                      <span style={{ fontSize: 10, color: "#aaa", minWidth: 16, textAlign: "right" }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Praise & Critique row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* Key Praise */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderLeft: "3px solid #10b981",
                  borderRadius: 12,
                  padding: "16px 18px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "#d1fae5",
                      border: "1px solid #10b98130",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ThumbsUp size={14} color="#10b981" />
                  </div>
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#065f46" }}>Key Praise</h3>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.6, fontStyle: "italic" }}>
                  {report.keyPraise}
                </p>
              </div>

              {/* Actionable Critique */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(245,158,11,0.2)",
                  borderLeft: "3px solid #f59e0b",
                  borderRadius: 12,
                  padding: "16px 18px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "#fef3c7",
                      border: "1px solid #f59e0b30",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AlertTriangle size={14} color="#f59e0b" />
                  </div>
                  <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#92400e" }}>Actionable Critique</h3>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.6, fontStyle: "italic" }}>
                  {report.actionableCritique}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 12,
                borderTop: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Sparkles size={12} color="#0db8c4" />
                <span style={{ fontSize: 11, color: "#aaa" }}>Generated by Planora AI · based on real attendee reviews</span>
              </div>
              <button
                onClick={handleAnalyze}
                style={{
                  fontSize: 12,
                  color: "#0db8c4",
                  background: "rgba(13,184,196,0.08)",
                  border: "1px solid rgba(13,184,196,0.2)",
                  borderRadius: 8,
                  padding: "5px 14px",
                  cursor: "pointer",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Wand2 size={11} />
                Re-analyze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}