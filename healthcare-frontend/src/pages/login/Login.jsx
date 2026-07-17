import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await authService.login(email, password);

    localStorage.setItem("token", response.token);

    navigate("/dashboard");
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.message ||
      "Email ou mot de passe incorrect."
    );
  } finally {
    setLoading(false);
  }

    }

    return(

        <div className="login-container">

            <form
            className="login-form"
            onSubmit={handleSubmit}
            >

                <h2>HealthCare+</h2>

                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />

                <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />

                {
                    error &&
                    <p className="error">{error}</p>
                }

                <button
                disabled={loading}
                >

                    {
                        loading?
                        "Connexion..."
                        :
                        "Se connecter"
                    }

                </button>

            </form>

        </div>

    )

}