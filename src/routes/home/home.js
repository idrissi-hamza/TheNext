import Calendar from "./calendar/Calendar";
import Sidebar from "./sidebar/Sidebar";

export default function Home() {
  return (
    <main className="h-full flex">
      <Sidebar/>
      <Calendar />
    </main>
  );
}
