// React
import { useEffect } from "react";

// Custom Hooks
import useAcitivity from "../../hooks/useActivity";

// CSS
import styled from "styled-components";

// Components
import ResumStatusBar from "../../components/Resume/ResumStatusBar";
import ResumeSetProfileForm from "../../components/Resume/Profile/ResumeSetProfileForm";

const Profile = styled.div`
  width: 100%;
`;

const ProfileEdit = () => {
  const [activityBtn, updateStatusBtn] = useAcitivity();

  useEffect(() => {
    console.log(activityBtn);
  }, [activityBtn]);

  return (
    <Profile>
      <div style={{ padding: "0 20px", boxSizing: "border-box" }}>
        <ResumStatusBar
          background="1"
          MobileLineWidth="50%"
          activityBtn={activityBtn}
          profileTitle="내 프로필 설정"
        />
      </div>
      <ResumeSetProfileForm updateStatusBtn={updateStatusBtn} />
    </Profile>
  );
};

export default ProfileEdit;
