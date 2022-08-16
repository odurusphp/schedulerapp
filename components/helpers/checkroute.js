import { useRouter } from "next/router";

function Checkroute(token) {
  const router = useRouter();
  try {
    if (token === null) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
    router.push("/");
  }
}

export default Checkroute;
