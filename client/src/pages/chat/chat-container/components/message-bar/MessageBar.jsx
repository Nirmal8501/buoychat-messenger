import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("");

  // we are adding a global event listener in the doc which will track the mouseClick and on the click it will have the element who triggered it, and onCLick we will run the handleClickOutside function. So emojiRef.current will store the div where emojiPicker is there as we have attached the ref at that place. and if the current ref doesnt contain the one which triggered it then close it.
  useEffect(() => {
    // to close emoji picker whenever clicked outside of it
    function handleClickOutside(event) {
      // console.log("Clicked element (event.target):", event.target);
      // console.log("Emoji Picker element (emojiRef.current):", emojiRef.current);

      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]); // will work even if emojiRef is not added in dependency as it is not changing, but a good practice to future proof it in case it changes.

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {};

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6  ">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none "
          placeholder="Enter Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="text-neutral-500 focus:border-none focus:outline:none focus:text-white duration-300 transition-all"
          // onClick={}
        >
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative ">
          <button
            className="text-neutral-500 focus:border-none focus:outline:none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0 " ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className=" bg-[#8417ff] rounded-full flex items-center justify-center p-5  focus:border-none focus:outline:none focus:text-white focus:bg-[#941bda] hover:bg-[#941bda] duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
