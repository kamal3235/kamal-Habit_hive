import HabitTracker from "../components/HabitTracker";
import programmingBee from "../assets/programmingBee.jpg";

const readingConfig = {
  title: "Your Reading Hive",
  imageSrc: programmingBee,
  entryLabel: "How many hours did you read?",
  placeholder: "e.g. 2.5",
  unit: "h",
  mosaicGridSize: 4,
  clearWarning:
    "Are you sure you want to clear all your reading data? This cannot be undone.",
  inspoQuote: "You've been a busy reading bee!",
};

const ReadingTracker = ({ entries, setEntries }) => (
  <HabitTracker entries={entries} setEntries={setEntries} {...readingConfig} />
);

export default ReadingTracker;
