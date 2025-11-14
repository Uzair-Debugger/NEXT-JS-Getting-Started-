"use client";

import React, { useEffect, useState } from "react";

type Book = { id: number; name: string };

export default function BooksClient() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // form state for adding/updating
  const [newName, setNewName] = useState("");
  const [newId, setNewId] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // fetch (GET) helper
  async function fetchBooks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/books");
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  // GET on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // POST - add new book
  async function addBook(e?: React.FormEvent) {
    e?.preventDefault();
    setStatus("Adding...");
    setError(null);
    try {
      if (newId === "" || !newName.trim()) {
        setStatus("Provide both id and name.");
        return;
      }
      const payload = { id: Number(newId), name: newName.trim() };
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`POST failed: ${res.status}`);
      await fetchBooks(); // refresh list
      setNewId("");
      setNewName("");
      setStatus("Book added.");
    } catch (err: any) {
      setError(err.message || "Add failed");
      setStatus(null);
    }
  }

  // start editing (prefill)
  function startEdit(book: Book) {
    setEditId(book.id);
    setEditName(book.name);
    setStatus(null);
  }

  // PUT - update
  async function updateBook(e?: React.FormEvent) {
    e?.preventDefault();
    if (editId === null) return;
    setStatus("Updating...");
    setError(null);
    try {
      const payload = { id: editId, name: editName.trim() };
      const res = await fetch(`/api/books/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
      await fetchBooks();
      setEditId(null);
      setEditName("");
      setStatus("Book updated.");
    } catch (err: any) {
      setError(err.message || "Update failed");
      setStatus(null);
    }
  }

  // DELETE
  async function deleteBook(id: number) {
    if (!confirm("Delete this book?")) return;
    setStatus("Deleting...");
    setError(null);
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
      await fetchBooks();
      setStatus("Book deleted.");
    } catch (err: any) {
      setError(err.message || "Delete failed");
      setStatus(null);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h2>Books (CRUD demo)</h2>

      <section style={{ marginBottom: 16 }}>
        <strong>Status:</strong> {loading ? "Loading..." : status ?? "idle"}
        {error && (
          <div style={{ color: "crimson", marginTop: 8 }}>
            Error: {error}
          </div>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>List</h3>
        {books.length === 0 ? (
          <div>No books found.</div>
        ) : (
          <ul>
            {books.map((b) => (
              <li key={b.id} style={{ marginBottom: 8 }}>
                <strong>{b.id}</strong>: {b.name}{" "}
                <button onClick={() => startEdit(b)} style={{ marginLeft: 8 }}>
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(b.id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={fetchBooks} style={{ marginTop: 8 }}>
          Refresh
        </button>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h3>Add new book (POST)</h3>
        <form onSubmit={addBook}>
          <input
            placeholder="id (number)"
            value={newId}
            onChange={(e) => {
              const v = e.target.value;
              // allow empty or numbers only
              if (v === "") return setNewId("");
              const n = Number(v);
              if (!Number.isNaN(n)) setNewId(n);
            }}
            style={{ marginRight: 8 }}
          />
          <input
            placeholder="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <button type="submit">Add</button>
        </form>
      </section>

      <section>
        <h3>Edit book (PUT)</h3>
        {editId === null ? (
          <div>Select a book's Edit button above to start editing.</div>
        ) : (
          <form onSubmit={updateBook}>
            <div>
              <label>
                id: <strong>{editId}</strong>
              </label>
            </div>
            <input
              placeholder="name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ marginRight: 8 }}
            />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setEditName("");
              }}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
