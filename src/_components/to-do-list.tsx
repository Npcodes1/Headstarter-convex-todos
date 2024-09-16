import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function TodoList() {
  const todos = useQuery(api.functions.listTodos);

  return (
    <ul className="space-y-2">
      {todos?.map(({ _id, title, description, completed }, index) => (
        <ToDoItem
          key={index}
          id={_id}
          title={title}
          description={description}
          completed={completed}
        />
      ))}
    </ul>
  );
}

function ToDoItem({
  id,
  title,
  description,
  completed,
}: {
  id: Id<"todos">;
  title: string;
  description: string;
  completed: boolean;
}) {
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);

  return (
    <li
      style={{
        width: "100%",
        display: "flex",
        gap: "0.5rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.25rem",
        padding: "0.5rem",
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => updateTodo({ id, completed: e.target.checked })}
      />
      <div style={{ marginLeft: "5px" }}>
        <p style={{ fontWeight: 600 }}>{title}</p>
        <p style={{ color: "gray", fontWeight: 600 }}>{description}</p>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <button
          type="button"
          style={{ color: "red" }}
          onClick={() => deleteTodo({ id })}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
