import { Header } from "../components/Header";
import { ProfileForm } from "../components/ProfileForm";

export const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Header />
      <h1>Update Profile</h1>
      <ProfileForm />
    </div>
  );
};
