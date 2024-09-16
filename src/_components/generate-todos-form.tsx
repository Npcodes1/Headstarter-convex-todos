import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export function GenerateTodosForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTodos = useAction(api.actions.generateTodos);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const todos = await generateTodos({ prompt });
      console.log(todos);
      setPrompt("");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Generating todos...</p>;
  }

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
          Generate Tasks with AI 🪄🔮
        </h2>
        <label
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
          htmlFor="prompt"
        >
          Prompt
        </label>
        <input
          style={{
            padding: "0.25rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
          }}
          type="text"
          name="prompt"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
