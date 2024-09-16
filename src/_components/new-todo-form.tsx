import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function NewToDoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTodo = useMutation(api.functions.createTodo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937" }}>
          Enter Your Tasks 📒
        </h2>
        {/* Title */}
        <label
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
          htmlFor="title"
        >
          Title
        </label>
        <input
          style={{
            padding: "0.25rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
          }}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <label
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
          htmlFor="description"
        >
          Description
        </label>
        <input
          style={{
            padding: "0.25rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
          }}
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          style={{
            backgroundColor: "#3b82f6",
            padding: "0.25rem",
            borderRadius: "0.25rem",
            color: "white",
          }}
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}
