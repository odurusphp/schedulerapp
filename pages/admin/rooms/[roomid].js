import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Editroom from "../../../components/Editroom.js";
import Menu from "../../../components/Menu.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export async function getServerSideProps(context) {
  const { roomid } = context.query;

  return {
    props: { roomid },
  };
}

export default function Edit() {
  const [roomdata, setRoomdata] = useState({});

  const router = useRouter();
  const roomid = router.query.roomid;

  const getroom = async () => {
    const url = process.env.API_URL + "/rooms/" + roomid;
    const header = {
      headers: {
        x_auth_token: localStorage.getItem("token"),
      },
    };
    try {
      const result = await axios.get(url, header);
      setRoomdata(result.data.data.room);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getroom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid">
      {/* Menu imported here  */}
      <Menu />
      <div className="h-screen bg-cip-grey">
        <div className="grid grid-cols-1 flow-col  w-2/4 mx-auto my-4">
          <div className="flex flex-row mt-10">
            <div className="mt-2 flex">
              <Link href={"/admin/rooms"}>
                <p className="text-base font-normal text-start -ml-10 mx-10 cursor-pointer">
                  <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>{" "}
                  Back
                </p>
              </Link>
              <p className="text-base font-normal underline underline-offset-8   decoration-cip-orange text-start uppercase">
                {roomdata.name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-1 flow-col w-2/4 mt-4 mx-auto">
          <Editroom roomdata={roomdata} />
        </div>
      </div>
    </div>
  );
}
