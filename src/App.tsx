import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

interface MessageProps {
  user: "user" | "bot";
  text: string;
}

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      messages.length !== 0 &&
      messages[messages.length - 1].user === "user"
    ) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);

        const botMessage = {
          user: "bot",
          text: messages[messages.length - 1].text,
        } as MessageProps;
        setMessages([...messages, botMessage]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget[0] as HTMLInputElement;
    if (input.value === "") return;
    const userMessage = {
      user: "user",
      text: input.value,
    } as MessageProps;
    setMessages([...messages, userMessage]);

    input.value = "";
  };

  return (
    <div className="w-full h-screen flex justify-end items-end">
      <div className="fixed bottom-4 right-4 w-12 h-12 rounded-full">
        <button
          className="w-full h-full bg-blue-500 text-white flex items-center justify-center rounded-full"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <FaComment size={24} />
        </button>
      </div>

      {chatOpen && (
        <div className="flex flex-col fixed bottom-14 right-10 w-96 h-2/3 bg-white border border-gray-300 rounded-md overflow-hidden">
          <div className="w-full h-10 bg-blue-500 text-white flex items-center justify-center">
            Chat
          </div>

          <div className="flex flex-1 flex-col w-full bg-gray-100 overflow-y-auto p-2">
            <div className="flex flex-col w-full flex-1 space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.user === "user" ? "justify-end" : "justify-start"
                  } w-full flex`}
                >
                  <div
                    className={`${
                      message.user === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    } max-w-[80%] break-words px-2 py-1 rounded-md`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="w-full flex justify-start">
                  <div className="bg-gray-300 flex flex-row break-words px-2 py-1 rounded-md">
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-10 ">
              <form
                onSubmit={onSubmit}
                className="flex w-full h-full space-x-1"
              >
                <input
                  type="text"
                  multiple
                  className="flex-1  h-full border border-gray-600 rounded-md px-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.currentTarget.value === "") return;
                      const userMessage = {
                        user: "user",
                        text: e.currentTarget.value,
                      } as MessageProps;
                      setMessages([...messages, userMessage]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full"
                  type="submit"
                >
                  <FiSend size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
