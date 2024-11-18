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
    if (response.data.statusCode == 201) {
      localStorage.setItem("authToken", response.data.data);
      window.location.reload();
    }
    const responseData = JSON.parse(response.data.message);
    return responseData;
  } catch (error) {
    debugger;
    console.log(error.response.data.statusCode);
    if (error.response.data.statusCode == 401) {
      window.location.reload();
    } else {
      await Swal.fire({
        toast: true,
        position: "top-end", // Posisi di pojok kanan atas
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500, // Menampilkan toast selama 1.5 detik
        timerProgressBar: true,
        didClose: () => {
          localStorage.removeItem("authToken");
          cekLogin.value = false;
          auth0.logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
          router.push({ name: "Login" });
        },
      });
    }

    // Redirect ke halaman login
    // router.push("/login");
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};
