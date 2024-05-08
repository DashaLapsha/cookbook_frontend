import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../services/authn';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = id ? parseInt(id, 10) : undefined;
        if (userId !== undefined && !isNaN(userId)) {
          const response = await getUserDetails(userId);
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {userDetails.username}</p>
      <img src={userDetails.profile_img} alt="Profile Image" />
      {userDetails.id && <p>User ID: {userDetails.id}</p>}
      {userDetails.email && <p>Email: {userDetails.email}</p>}
      {userDetails.dietary_pref && <p>Dietary Preference: {userDetails.dietary_pref}</p>}
      {userDetails.cooking_skill_lvl && <p>Cooking Skill Level: {userDetails.cooking_skill_lvl}</p>}
    </div>
  );
};

export default UserDetails;
