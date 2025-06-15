import React, { useState, useEffect, useRef } from "react";
import pokebot from "../../assets/pokebot.gif";
import chatbot from "../../assets/chatbot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { pokemonNames } from "../../services/getPokemonName";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import LoadingDots from "./LoadingDots"

function Bot() {
  const randomPokemon =
    pokemonNames[Math.floor(Math.random() * pokemonNames.length)];

  const [displaychat, setDisplay] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableinput, setDisableInput] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    { role: "bot", content: ["Welcome trainer!", " How can I help you?"] },
    {
      role: "bot",
      content: [
        <p>Please click any : </p>,
        <p className="underline" onClick={() => setInput("What is a pokemon?")}>
          What is a pokemon?
        </p>,
        <p
          className="underline"
          onClick={() => setInput(`Tell me about ${randomPokemon}.`)}
        >{`Tell me about ${randomPokemon}.`}</p>,
        <p
          className="underline"
          onClick={() => setInput(`Some stats about ${randomPokemon}.`)}
        >{`Some stats about ${randomPokemon}.`}</p>,
      ],
    },
  ]);

  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  function openCloseChat() {
    setDisplay(!displaychat);
  }


  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const genarateChat = async (message) => {
    try {
      setLoading(true);
      setDisableInput(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `You are pokedex,  a helpful pokemon chatbot. You know about pokemon, their types, description and everything else about them. If the user asks about a particular pokemon, respond with information about it. If user asks a question that is not related to pokemon, you can respond that you are a pokemon chatbot. The user's question is: ${message}`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      setLoading(false);
      return response.text();
    } catch (error) {
      setLoading(false);
      return "Sorry, I'm having trouble connecting with the pokemon network...";
    }
  };

  const typemessage = async (response) => {
    const botMessage = { role: "bot", content: "" };
    setMessages((prev) => [...prev, botMessage]);

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < response.length) {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastMessage = updatedMessages.length - 1;
          updatedMessages[lastMessage] = {
            ...updatedMessages[lastMessage],
            content: response.substring(0, index + 1),
          };
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(typeInterval);
        setDisableInput(false);
      }
    }, 30);
    
  };

  const sendMessage = async (message = input) => {
    if (message === "") return;
    const usermessage = { role: "you", content: message };
    setMessages((prev) => [...prev, usermessage]);
    setInput("");

    const botResponse = await genarateChat(message);
    typemessage(botResponse);
  };

  return (
    <>
      <div
        onClick={() => openCloseChat()}
        className={`${
          displaychat ? "visible" : "hidden"
        } fixed z-30 bottom-2 right-2 bg-[#4b4949] rounded-full shadow-lg shadow-black-500/50 cursor-pointer`}
      >
        <img className="h-12" src={pokebot} alt="#" />
      </div>
      <div
        className={`flex flex-col ${
          displaychat ? "hidden" : "visible"
        } fixed z-30 right-2 bottom-2 rounded-md bg-white w-60 h-96 shadow-lg shadow-slate-900/20 -shadow-spread-2 cursor-pointer`}
      >
        <div className="bg-blue-500 rounded-t-md h-1/6 flex items-center justify-between">
          <img className="h-12 text-left" src={chatbot} alt ="#"/>
          <FontAwesomeIcon
            onClick={() => openCloseChat()}
            className="text-white mr-2 h-8"
            icon={faXmark}
          />
        </div>
        <div
          ref={messagesEndRef}
          className="h-4/6 p-2 space-y-5 overflow-auto no-scrollbar"
        >
          {messages.map((msg, index) => (
            <div
              className={`${
                msg.role === "bot" ? "float-left" : " float-right"
              } w-3/4 break-words rounded-lg`}
              key={index}
            >
              <img
                className={`${
                  msg.role === "bot" ? "inline" : "hidden"
                } h-6 mb-1`}
                src={chatbot}
                alt ="#"
              />
              <div className="font-serif text-slate-500 text-sm space-y-1">
                {Array.isArray(msg.content) ? (
                  msg.content.map((item, index) => (
                    <div
                      className="bg-slate-200 ml-2 p-2 rounded-lg hover:bg-white hover: transition-all duration-300 ease-in-out"
                      key={index}
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className={`${msg.role === 'bot' ? 'bg-slate-200': 'bg-blue-200'} ml-2 p-2 rounded-lg hover:bg-white hover: transition-all duration-300 ease-in-out`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="clear-both"></div>
          {loading && <LoadingDots />}
        </div>
        <div className="h-1/6">
          <div className="relative border border-slate-200 p-3 m-2 rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
            <input
              autoComplete="off"
              className="outline-none w-3/4 text-sm bg-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              disabled={disableinput}
            />
            <FontAwesomeIcon
              onClick={() => sendMessage()}
              className="absolute top-4 right-6"
              icon={faPaperPlane}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Bot;
