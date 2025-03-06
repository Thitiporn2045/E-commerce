import { Layout } from "./Layout";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export const Toast = ({ message, type, duration = 3000 }: ToastProps) => {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div
      id="toast"
      class={`fixed bottom-4 right-4 text-white px-6 py-3 rounded-md shadow-lg transform transition-transform duration-300 flex items-center ${bgColor} opacity-0`}
      style={{
        zIndex: 9999,
        transform: "translateY(100%)",
      }}
      data-duration={duration}
      data-script="on load wait 50ms then add .opacity-100 then
         set my.style.transform to 'translateY(0)' then
         wait getAttribute('data-duration')ms then
         set my.style.transform to 'translateY(100%)' then
         add .opacity-0 then
         wait 300ms then remove me"
    >
      <span class="mr-2">
        {type === "success" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        {type === "error" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        )}
        {type === "info" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </span>
      {message}
    </div>
  );
};
