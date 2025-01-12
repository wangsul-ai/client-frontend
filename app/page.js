'use client';

import { useEffect, useState } from "react";

// for parsing markdown inside chat messages
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Modal from "@/components/modal";

export default function Home() {

  // TODO: blom rapi & modular, nanti dibagi jadi subcomponent kalo bisa

  // TODO: - modal untuk back & reset; - buat fungsi untuk "initial state"

  /**
   * urutan event?:
   *  0. logo wangsul.ai dan wayang udah asli ada
   *  1. [udah selesai load] wayangnya ilang, input textnya muncul
   *  2. [user ngeprompt chat pertama] UI berubah, 
   *     logo ilang pindah ke atas, muncul tombol quiz
   */

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // chats
  const [chatMode, setChatMode] = useState("initial");
  const [normalChat, setNormalChat] = useState([]);
  const [quizChat, setQuizChat] = useState([
    {
      type: "bot", text:
        [
          `### **Selamat datang di Fun Quiz!🎉**
Petunjuk permainan:
1. Kuis akan diberikan terus menerus tanpa batas
2. Apabila ingin berhenti dari permainan, klik tombol kembali di pojok kiri atas untuk kembali ke _room chat_`,
          "**Sudah siap main Quiz? 😯 Kalau sudah, ayo kita mulai!**",
        ]
    }
  ]);

  const resetChat = () => {

    setChatMode("initial");
    setQuizChat([
      {
        type: "bot", text:
          [
            `### **Selamat datang di Fun Quiz!🎉**
Petunjuk permainan:
1. Kuis akan diberikan terus menerus tanpa batas
2. Apabila ingin berhenti dari permainan, klik tombol kembali di pojok kiri atas untuk kembali ke _room chat_`,
            "**Sudah siap main Quiz? 😯 Kalau sudah, ayo kita mulai!**",
          ]
      }
    ]);
    setNormalChat([]);

  }


  useEffect(() => {

    // todo: loading
    const loadContent = async () => {
      await new Promise((resolve) => {
        setTimeout(() => { // bisa diganti load model/api (?)
          resolve();
        }, 3000)
      });
      setIsLoading(false);
    };
    loadContent();

    // todo: cek adakah dialog tersimpan di localstorage
    // update: udah, gak usah. simpen di state aja

    // todo: ambil satu pertanyaan dari llm untuk quiz
    setQuizChat([...quizChat, { type: "bot", text: ["**Pertanyaan 1:**\nWould you destroy something perfect in order to make it beautiful? :("] }]); // delete this soon


    return () => { };
  }, []);


  // dialog managements
  function onSend(text) {
    if (chatMode === 'normal' || chatMode === 'initial') {

      // todo: fetch response dari llm
      // note: gapaham :( apa pake useEffect yg dependency nya messages?
      setNormalChat([...normalChat, { type: "user", text }, { type: "bot", text: "response dari llm" }]); // delete this soon

    } else if (chatMode === 'quiz') {

      setQuizChat([...quizChat, { type: "user", text }, { type: "bot", text: ["**Jawaban Anda: Benar!**", "**Pertanyaan 2:** lorem ipsum astaghfirullah subhanallah"] }]); // delete this soon

    }

  }

  return (
    <div className={`w-full h-screen flex justify-center items-center flex-col transition-colors duration-1000 ease-out
      ${(chatMode === 'normal' || chatMode === 'initial')
        ? 'bg-palette-bg'
        : 'bg-palette-quiz-bg'}`}>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="font-extrabold text-2xl my-1">Kembali ke Halaman Awal?</h2>
          <div className="my-2">
            <p className="">Percakapan sebelumnya akan terhapus apabila Anda kembali ke halaman awal.</p>
            <p className="mt-4">Setuju untuk menghapus percakapan dan menuju halaman awal?</p>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button className="w-[50%] py-2 font-semibold rounded-xl border-2 border-palette-textplaceholder text-palette-textplaceholder m-1"
              onClick={() => setIsModalOpen(false)}>
              Batal
            </button>
            <button className="w-[50%] py-2 font-semibold rounded-xl bg-palette-red text-palette-bg m-1"
              onClick={() => {resetChat(); setIsModalOpen(false)}}>
              Ya, Saya Setuju
            </button>
        </div>
      </Modal>

      {
        normalChat.length > 0
          ? (   // dialog sudah mulai, chat header & chat container visibel
            <>
              <ChatHeader
                onBackClick={() => {
                  if (chatMode === 'quiz') setChatMode('normal')
                  else if (chatMode === 'normal' || chatMode === 'initial') setIsModalOpen(true)
                }}
                className={`${(chatMode === 'normal' || chatMode === 'initial')
                  ? 'bg-palette-bg'
                  : 'bg-palette-quiz-bg'}`}
              >
                {
                  chatMode === 'normal' || chatMode === 'initial'
                    ? ( // mode normal
                      <>
                        <img src="/wangsul.ai.svg" alt="wangsul.ai logo" className="h-5 lg:h-7 my-auto" />
                        <button
                          className="lg:py-1 lg:px-3 lg:border-2 lg:border-palette-text lg:rounded-2xl lg:hover:scale-105"
                          onClick={() => setChatMode(prev => prev === 'quiz' ? 'normal' : 'quiz')}>
                          <img src="/icon-funquiz.svg" alt="fun quiz logo" className="h-10 lg:hidden" />
                          <img src="/icon-funquiz-lg.svg" alt="fun quiz logo" className="h-7 hidden lg:block" />
                        </button>
                      </>
                    ) : ( // mode fun quiz
                      <>
                        <img src="/icon-wangsul.ai-funquiz.svg" alt="wangsul.ai logo in fun quiz mode"
                          className="h-5 my-2.5 lg:h-8 lg:my-1 m-auto" />
                      </>
                    )
                }

              </ChatHeader>

              <ChatContainer mode="quiz" currentMode={chatMode} className="bg-palette-quiz-bg">
                <div className="h-3 lg:h-10"></div>
                {quizChat.map((msg, idx) => {
                  return msg.type === "user"
                    ? <UserMessageQuiz key={idx * 2} text={msg.text} />
                    : <BotMessageQuiz key={idx * 2 - 1} text={msg.text} />
                })}
              </ChatContainer>

              <ChatContainer mode="normal" currentMode={chatMode} className="bg-palette-bg">
                {normalChat.map((msg, idx) => {
                  return msg.type === "user"
                    ? <UserMessage key={idx} text={msg.text} />
                    : <BotMessage key={idx} text={msg.text} />
                })}
              </ChatContainer>

            </>
          ) : ( // dialog masih kosong, logo & wayang visibel
            <>
              <img src="/wangsul.ai-caption.svg" alt="logo"
                className={`${isLoading ? 'animate-pulse' : ''} fixed inset-0 w-2/3 m-auto
                  lg:static lg:w-2/5 lg:m-0 lg:mb-16`} />

              <img src="/wayang.svg" alt="Loading..."
                className={`${isLoading ? 'animate-pulse' : 'animate-flyOut'} w-full fixed bottom-0
                  md:hidden`} />

              {/* for large screen */}
              <img src="/cloud-group-3.svg" alt="Loading"
                className={`${isLoading ? 'animate-pulse' : ''} hidden fixed -right-8 top-4
                  md:block`} />
              <img src="/cloud-group-3.svg" alt="Loading"
                className={`${isLoading ? 'animate-pulse' : ''} hidden fixed -left-4 top-8 -scale-x-100
                  md:block`} />
            </>
          )
      }

      <ChatInput isLoading={isLoading} hasMessages={normalChat.length > 0} onSend={onSend}
        className={`
        ${(chatMode === 'normal' || chatMode === 'initial')
            ? 'bg-palette-bg'
            : 'bg-palette-quiz-bg'}`}
      />

    </div>
  )
}

function ChatInput({ isLoading, hasMessages, onSend, className = "" }) {

  const [inputText, setInputText] = useState("");
  function inputTextChange(e) {
    setInputText(e.target.value);
  }

  return (
    <div className={`${isLoading ? '-bottom-full lg:opacity-0' : 'bottom-0'} fixed w-screen bg-palette-bg shadow-superlg transition-all duration-700 ease-out z-10
        ${hasMessages ? 'lg:fixed lg:px-48 md:px-16' : 'lg:static lg:w-[45%]'} lg:pb-8 lg:shadow-none
        ${className}`}>

      <div className={`h-10 mx-6 my-4 p-1 bg-gray-100 rounded-full flex
        lg:rounded-2xl lg:h-14 lg:p-2 lg:pl-4 ${hasMessages ? 'lg:mx-0' : ''}`}>
        <input type="text" placeholder="apa yang ingin kamu tanyakan?"
          className="w-1/2 flex-1 px-3 bg-transparent focus:outline-none focus:border-none text-palette-text placeholder-palette-textplaceholder"
          value={inputText} onChange={inputTextChange}
        />
        <img src="/icon-send.svg" alt="send" className="w-10 cursor-pointer
          lg:hover:scale-105 lg:hover:filter lg:hover:brightness-105"
          onClick={() => {
            if (inputText === "") return;
            onSend(inputText);
            setInputText("");
          }}
        />
      </div>

    </div>
  );

}

function ChatHeader({ className = "", children, onBackClick }) {
  return (
    <div className={`fixed w-full top-0 flex items-center p-4 bg-palette-bg transition-colors duration-700 ease-out 
      lg:shadow-superlg lg:px-24 lg:py-6 z-10 ${className}`}>

      <button className="my-auto cursor-pointer lg:hover:scale-110" onClick={onBackClick}>
        <img src="/icon-backarrow.svg" alt="back arrow" className="h-5 my-auto" />
      </button>

      <div className="flex-1 flex justify-between items-center pl-3 lg:pl-4">

        {/* todo: add animation soon */}
        {children}

      </div>

    </div>
  );
}

function ChatContainer({ children, mode, currentMode, className = "" }) {

  let animation = ""
  if (currentMode !== "initial") {
    animation = currentMode === mode
      ? "animate-chatContainerIn"
      : "animate-chatContainerOut";
  }

  return (
    <div className={`fixed w-screen top-16 bottom-0 flex flex-col rounded-3xl ${animation} ${className}`}>
      <div className="flex-1 overflow-y-auto px-4 w-full
        md:px-16 lg:px-48">

        {/* diisi chat */}
        {children}

        {/* placeholder biar chat paling akhir gk ketutupan */}
        <div className="h-20 lg:h-32"></div>

      </div>
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div className="text-right my-5 lg:my-8">
      <div className="max-w-[70%] px-5 py-2 inline-block bg-palette-chatbg text-palette-text
      rounded-t-3xl rounded-l-3xl rounded-br-none text-left
      md:max-w-[50%] lg:max-w-[33%]">
        {text}
      </div>
    </div>
  );
}

function BotMessage({ text }) {
  return (
    <div className="w-full flex my-1">
      <img src="/icon-w.ai.svg" alt="wangsul.ai" className="h-10 inline-block" />
      <div className="px-4 botMessage">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

function UserMessageQuiz({ text }) {
  return (
    <div className="text-right my-5 lg:my-8">
      <div className="max-w-[70%] px-5 py-2 inline-block bg-palette-quiz-chatbg-user text-palette-text
      rounded-t-3xl rounded-l-3xl rounded-br-none text-left
      md:max-w-[50%] lg:max-w-[33%]">
        {text}
      </div>
    </div>
  );
}

function BotMessageQuiz({ text }) {
  return (
    <div className="w-full flex my-1">
      <img src="/icon-w.ai.svg" alt="wangsul.ai" className="h-10 inline-block" />
      <div className="flex-1 ml-3">
        {text.map((text, idx) => (
          <>
            {idx === 0 ? null : <br />}
            <div className="px-5 py-2 inline-block bg-palette-quiz-chatbg-bot text-palette-bg
              rounded-3xl text-left
              md:max-w-[80%] mb-1.5 botMessageQuiz"
              key={idx}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}