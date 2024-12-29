import NavBar from "../Components/NavBar";
import ProfileBody from "../Components/profileBody";
import Footer from "../Components/Footer";
import { getUser } from "../controllers/userController";
import "../Styles/ProfilePage.css";

const user = await getUser();
console.log("user from page", user);

function ProfilePage() {
  return (
    <>
      <NavBar></NavBar>
      <ProfileBody user={user}></ProfileBody>
      <Footer></Footer>
    </>
  );
}

export default ProfilePage;
