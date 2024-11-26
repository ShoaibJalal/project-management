import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:bg-dark-secondary dark:text-white">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {task.title}
        </h3>
        {task.priority && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              task.priority === "Urgent"
                ? "bg-red-100 text-red-700"
                : task.priority === "High"
                  ? "bg-yellow-100 text-yellow-700"
                  : task.priority === "Medium"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>

      {/* Attachment */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="text-gray-700 dark:text-gray-400">
            Attachment:
          </strong>
          <Image
            src={`https://s3-pm-images.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            width={400}
            height={200}
            className="mt-2 rounded-md shadow"
          />
        </div>
      )}

      {/* Task Details */}
      <div className="space-y-2">
        <p>
          <strong className="text-gray-700 dark:text-gray-400">
            Description:
          </strong>{" "}
          {task.description || "No description provided"}
        </p>
        <p>
          <strong className="text-gray-700 dark:text-gray-400">Status:</strong>{" "}
          {task.status}
        </p>
        <p>
          <strong className="text-gray-700 dark:text-gray-400">Tags:</strong>{" "}
          {task.tags || "No tags"}
        </p>
      </div>

      {/* Dates */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <strong className="text-gray-700 dark:text-gray-400">
            Start Date:
          </strong>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
        </div>
        <div>
          <strong className="text-gray-700 dark:text-gray-400">
            Due Date:
          </strong>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
        </div>
      </div>

      {/* Author and Assignee */}
      <div className="mt-4 flex justify-between text-sm">
        <p>
          <strong className="text-gray-700 dark:text-gray-400">Author:</strong>{" "}
          {task.author ? task.author.username : "Unknown"}
        </p>
        <p>
          <strong className="text-gray-700 dark:text-gray-400">
            Assignee:
          </strong>{" "}
          {task.assignee ? task.assignee.username : "Unassigned"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
