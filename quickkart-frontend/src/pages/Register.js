import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/common/AuthLayout";
import { AuthForm } from "../components/auth/AuthForm";
import AuthHandler from "../auth/AuthService";
import "../styles/Register.css"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await AuthHandler.register({ name, email, password });
      if (success) navigate("/login");
      else alert("Registration failed");
    } catch (error) {
      alert("Registration error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join the fastest growing platform for buyers and sellers"
      description="Sign up to list your products, manage your purchases, and access exclusive offers tailored just for you."
    >
      <AuthForm
        isLogin={false}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        onSubmit={handleRegister}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}