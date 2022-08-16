import { useRouter } from "next/router";

function checkroute() {
  try {
    const token = localStorage.getItem("token");
    const router = useRouter();
    if (!token) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
    router.push("/");
  }
}

export default checkroute;
