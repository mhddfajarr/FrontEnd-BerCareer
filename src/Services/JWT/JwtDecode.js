import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";

const API_URL = "https://localhost:7147/api/Sessions/Validate";

export const decodeToken = async () => {
  const auth0 = useAuth0();
  const token = localStorage.getItem("authToken");
  const router = useRoute();
  try {
    const response = await axios.post(
      "https://localhost:7147/api/Sessions/Validate",
      {
        token: token,
      }
    );
    const responseData = JSON.parse(response.data.message);
    return responseData;
  } catch (error) {
    await Swal.fire({
      toast: true,
      position: "top-end", // Posisi di pojok kanan atas
      icon: "error",
      title: error.response.data.message,
      showConfirmButton: false,
      timer: 1500, // Menampilkan toast selama 1.5 detik
      timerProgressBar: true,
      didClose: () => {
        router.push({ name: "Login" });
      },
    });
    auth0.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    localStorage.removeItem("authToken");
    cekLogin.value = false;
    // Redirect ke halaman login
    // router.push("/login");
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};
