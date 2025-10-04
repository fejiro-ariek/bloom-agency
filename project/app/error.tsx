"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>{error?.message || "An unexpected error occurred."}</p>
    </div>
  );
}
