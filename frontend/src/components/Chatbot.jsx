import { useState } from "react";
import { sendMessage } from "../services/chatApi";
import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm your AI Warehouse Assistant.\nHow can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    const reply = await sendMessage(userMessage);

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: reply },
    ]);

    setLoading(false);
  };

  const quickAsk = async (question) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
    ]);

    setLoading(true);

    const reply = await sendMessage(question);

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: reply },
    ]);

    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          className="chat-toggle"
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}

      {open && (
        <div className="chat-container">

          <div className="chat-header">

            <span>🤖 Warehouse Assistant</span>

            <button onClick={() => setOpen(false)}>
              ✖
            </button>

          </div>

          <div className="chat-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-msg"
                    : "bot-msg"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bot-msg">
                Thinking...
              </div>
            )}

          </div>

          <div className="quick-buttons">

            <button
              onClick={() =>
                quickAsk("Which products are low in stock?")
              }
            >
              Low Stock
            </button>

            <button
              onClick={() =>
                quickAsk("What is the total inventory value?")
              }
            >
              Inventory Value
            </button>

            <button
              onClick={() =>
                quickAsk("Give me today's warehouse summary.")
              }
            >
              Summary
            </button>

          </div>

          <div className="chat-input">

            <input
              value={message}
              placeholder="Ask anything..."
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button onClick={handleSend}>
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;