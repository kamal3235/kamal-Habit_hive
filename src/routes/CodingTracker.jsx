import HabitTracker from "../components/HabitTracker";
import codingImage from "../assets/codingImage.jpg";

const codingConfig = {
  title: "Your Coding Hive",
  imageSrc: codingImage,
  entryLabel: "How many hours did you code?",
  placeholder: "e.g. 2.5",
  unit: "h",
  mosaicGridSize: 4,
  clearWarning:
    "Are you sure you want to clear all your coding data? This cannot be undone.",
};

const CodingTracker = ({ entries, setEntries }) => (
  <HabitTracker
    inspoQuote="You've been a busy coding bee!"
    entries={entries}
    setEntries={setEntries}
    {...codingConfig}
  />
);

export default CodingTracker;
