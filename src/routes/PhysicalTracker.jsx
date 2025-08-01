import HabitTracker from "../components/HabitTracker";
import flashdanceBee from "../assets/flashdanceBee.jpg";

const physicalConfig = {
  title: "Your Physical Hive",
  imageSrc: flashdanceBee,
  entryLabel: "How many minutes did you exercise?",
  placeholder: "e.g. 30",
  unit: "min",
  mosaicGridSize: 4,
  clearWarning:
    "Are you sure you want to clear all your physical activity data? This cannot be undone.",
  inspoQuote: "You're Hive-ly Active!",
};

const PhysicalTracker = ({ entries, setEntries }) => (
  <HabitTracker entries={entries} setEntries={setEntries} {...physicalConfig} />
);

export default PhysicalTracker;
