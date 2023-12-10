"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

 return (
  <div className={classes["body-1"]}>
    <div className={classes["chat-container"]}>
      <input
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default behavior of adding a newline
            sendMessage(message);
            setMessage("");
          }
        }}
        className={classes["chat-input"]}
        placeholder="Message..."
        value={message}
      />
      <button
        onClick={(e) => {sendMessage(message);
        setMessage(" ")}}
        className={classes["button"]}
      >
        Send
      </button>
    </div>
    <div>
      <ul className={classes["messages"]}>
        {messages.map((e, index) => (
          <li key={index}>{e}</li>
        ))}
      </ul>
    </div>
  </div>
);

}