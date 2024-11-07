import { useAppStore } from "@/store/store";

const Profile = () => {
  const { userInfo } = useAppStore();

  return (
    <div>
      <div>Profile</div>
      <div>Email : {userInfo.email}</div>
    </div>
  );
};

export default Profile;
