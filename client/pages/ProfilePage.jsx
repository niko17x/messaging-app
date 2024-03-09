import { Header } from "../components/Header";
import { UpdateProfileForm } from "../components/UpdateProfileForm";

export const ProfilePage = () => {
  return (
    <div className="user-profile-page">
      <Header />
      <h1>Update Profile</h1>
      <UpdateProfileForm />
    </div>
  );
};
