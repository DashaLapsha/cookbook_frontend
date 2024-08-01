import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails, updateUserDetails } from '../../services/authn';
import RecipeCard from '../recipes_components/RecipeCard';
import '../../css/profile.scss';
import { AuthContext } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated || false;
  const user = authContext?.user || null;
  const [userDetails, setUserDetails] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    username: '',
    cooking_skill_lvl: '',
    profile_img: null as File | null
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = id ? parseInt(id, 10) : undefined;
        if (userId !== undefined && !isNaN(userId)) {
          const response = await getUserDetails(userId);
          setUserDetails(response.data);
          setUpdatedDetails({
            username: response.data.username,
            cooking_skill_lvl: response.data.cooking_skill_lvl,
            profile_img: response.data.profile_img
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      profile_img: file,
    }));
  };

  const handleRemoveImage = () => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      profile_img: null,
    }));
  };

  const handleSave = async () => {
    try {
      if (!isAuthenticated || !user || !user.id) {
        throw new Error("User is not logged in or missing userId");
      }
      const formData = new FormData();
  
      formData.append('user', user.id.toString());
      formData.append('username', updatedDetails.username);
      formData.append('cooking_skill_lvl', updatedDetails.cooking_skill_lvl);
  
      if (updatedDetails.profile_img && typeof updatedDetails.profile_img !== 'string') {
        formData.append('profile_img', updatedDetails.profile_img);
      }
  
      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
  
      if (userDetails.id) {
        const response = await updateUserDetails(userDetails.id, formData);
        console.log("Response from backend:", response);
  
        setUserDetails((prevDetails: any) => ({
          ...prevDetails,
          ...updatedDetails,
          profile_img: updatedDetails.profile_img && typeof updatedDetails.profile_img !== 'string'
            ? URL.createObjectURL(updatedDetails.profile_img)
            : updatedDetails.profile_img
        }));
        setEditMode(false);
      } else {
        console.log("Error: User ID is missing");
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };  

  if (!userDetails) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="user-details-container">
      {editMode ? (
        <div className='user-details'>
          <div className="profile-img-container">
            {updatedDetails.profile_img ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={
                    typeof updatedDetails.profile_img === 'string'
                      ? updatedDetails.profile_img
                      : URL.createObjectURL(updatedDetails.profile_img)
                  }
                  alt="Profile"
                  className="profile-img"
                />
                <button className="remove-img" onClick={handleRemoveImage}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            ) : (
              <div className="custom-file-upload">
                <input
                  type="file"
                  id="profile_img"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleImageChange(e.target.files[0]);
                    }
                  }}
                />
                <p>Drag your image here or click in this area.</p>
              </div>
            )}
          </div>

          <div className="edit-container">
            <input
              placeholder='Username'
              type="text"
              id="username"
              value={updatedDetails.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
          </div>

          <div className="edit-container">
            <label>Cooking Skill Level:</label>
            <div className="difficulty-container">
              <div
                className={`difficulty-card ${updatedDetails.cooking_skill_lvl === 'Beginner' ? 'selected' : ''}`}
                onClick={() => handleInputChange('cooking_skill_lvl', 'Beginner')}
              >
                Beginner
              </div>
              <div
                className={`difficulty-card ${updatedDetails.cooking_skill_lvl === 'Intermediate' ? 'selected' : ''}`}
                onClick={() => handleInputChange('cooking_skill_lvl', 'Intermediate')}
              >
                Intermediate
              </div>
              <div
                className={`difficulty-card ${updatedDetails.cooking_skill_lvl === 'Advanced' ? 'selected' : ''}`}
                onClick={() => handleInputChange('cooking_skill_lvl', 'Advanced')}
              >
                Advanced
              </div>
            </div>
          </div>
          <div className="buttons">
            <button onClick={handleSave} className="save-button">
              <FontAwesomeIcon icon={faCheck} /> Save
            </button>
            <button onClick={() => setEditMode(false)} className="cancel-button">
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="user-details">
          <div className="profile-img-container">
            <img src={userDetails.profile_img} alt="Profile" className="profile-img" />
          </div>
          <div className="username-container">
            <h1>{userDetails.username}</h1>
            {isAuthenticated && user && user.id === userDetails.id && (
              <button onClick={() => setEditMode(true)} className="edit-button">
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
          </div>
          {userDetails.cooking_skill_lvl && <p>{userDetails.cooking_skill_lvl}</p>}
        </div>
      )}
      <h2>User's Recipes</h2>
      <div className="recent-recipes-container">
        {userDetails.recipes && userDetails.recipes.length > 0 ? (
          userDetails.recipes.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div className="loading-container">
            <p>No recipes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
