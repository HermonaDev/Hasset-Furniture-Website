import { useNavigate } from "react-router-dom";

const userExistsGuard = () => {
  const navigate = useNavigate();
  const user = false; 

  if (!user) {
    navigate('/register');
    return false;
  }

  return true;
};

export default userExistsGuard;