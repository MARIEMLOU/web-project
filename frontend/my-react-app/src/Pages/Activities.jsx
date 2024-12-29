import ActBody from "../Components/ActBody";
import Footer from "../Components/Footer";
import "../Styles/Activities.css";
import NavBar from "../Components/NavBar";
import { getActivities } from "../controllers/activitiesController";

const activities = await getActivities();
console.log("activities", activities);
function Activities() {
  return (
    <>
      <NavBar></NavBar>
      <ActBody activities={activities}></ActBody>
      <Footer></Footer>
    </>
  );
}

export default Activities;
