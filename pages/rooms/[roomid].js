import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export async function getServerSideProps(context) {
  const { roomid } = context.query;
  return {
    props: { roomid },
  };
}

export default function Rooms() {
  const router = useRouter();
  const roomid = router.query.roomid;
  const [roomdata, setRoomdata] = useState({});

  const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      isPlaying
      duration={700}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );

  const getRoom = async () => {
    const url = process.env.API_URL + "/rooms/" + roomid;
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const result = await axios.get(url, header);
    setRoomdata(result.data.data);
  };
  useEffect(() => {
    getRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex ${
        roomdata.status === "active" ? "bg-red-100" : "bg-cip-blue"
      } h-screen`}
    >
      <div className="mx-auto my-auto">
        <div>
          <p className="text-center text-2xl font-black m-2 uppercase">
            Room {roomid}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {UrgeWithPleasureComponent()}
        </div>
      </div>
    </div>
  );
}
