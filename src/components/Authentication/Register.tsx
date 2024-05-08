import React, { useState } from 'react';
import { register } from '../../services/authn';

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [cookingSkill, setCookingSkill] = useState("Beginner");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("cooking_skill_lvl", cookingSkill);
    if (profileImage) {
      formData.append("profile_img", profileImage);
    }

    register(formData).then(
      () => {
        setMessage("We have sent an email. Please check your inbox to verify your account.");
        setIsRegistered(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="form-container sign-up-container">
      {!isRegistered ? (
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
          <input type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          <select value={cookingSkill} onChange={(e) => setCookingSkill(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input type="file" onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)} />
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <div className="form-group">
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
