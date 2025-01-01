import { useAppStore } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  //whenever this user's info changes (anywhere in the app as we are using store) this will trigger.
  // if user tries to access chat when profile is not setup (user auth is checked in app.jsx)
  useEffect(() => {
    if (!userInfo.isProfileSetup) {
      toast("Please Setup Profile to continue...");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div>Chat</div>;
};

export default Chat;
