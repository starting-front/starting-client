import { useState } from "react";

// Util
import validateEmail from "../../../util/validateEmail";

// CSS
import styled from "styled-components";

// Components
import FiledJob from "../../Card/FiledJob";
import ResumeFooterTitle from "../ResumFooterTitle";

const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0px 0 20px 0;
  font-family: Pretendard;
`;

const ResumeForm = styled.form`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 599px) {
    padding: 80px 20px 100px 20px;
    box-sizing: border-box;
  }
`;

const ResumeMainTitle = styled.div`
  display: flex;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #8644ff;
  color: white;
  font-weight: 600;
  font-size: 11px;
`;

const ResumeSubTitle = styled.div`
  color: #8644ff;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
`;

const ResumeLabel = styled.label`
  display: block;
  margin: 20px 0px 8px 0px;
  color: #303646;
  font-size: 11px;
  font-weight: 400;
  line-height: 12px;
`;

const ResumeInput = styled.input`
  width: 100%;
  height: 46px;
  padding: 12px 12px 12px 16px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #626e8e;

  &:hover,
  &:focus {
    border: 1px solid #8644ff;
    outline: none;
  }

  &.email,
  &.tel {
    width: 85%;
  }
`;

const ResumeTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px 12px 12px 16px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #626e8e;
  resize: none;

  &:hover,
  &:focus {
    border: 1px solid #8644ff;
    outline: none;
  }
`;

const ResumIntroduceTextLength = styled.span<{ $legnthExceed?: boolean }>`
  position: absolute;
  color: ${(props) => (props.$legnthExceed ? "red" : "#303646")};
  bottom: 18px;
  right: 16px;
  font-size: 14px;
`;

const ToggleContainer = styled.div<{ $isPublic?: boolean }>`
  position: relative;
  width: 52px;
  height: 20px;
  background-color: ${(props) => (props.$isPublic ? "#8644FF" : "#F7F7F7")};
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 3px 2px;
  display: flex;
`;

const ToggleSwitch = styled.div<{ $isPublic?: boolean }>`
  position: absolute;
  left: ${(props) => (props.$isPublic ? "30px" : "3px")};
  bottom: 3px;
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.$isPublic ? "white" : "#8644FF")};
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 50%;
  transition: 0.2s;
`;

const ResumText = styled.span`
  color: #49526a;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px 0 15px;
  white-space: nowrap;
`;

const ResumeUserKeywords = styled.span`
  display: inline-block;
  background-color: #8644ff;
  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  padding: 6px 12px;
  border-radius: 4px;
  margin: 8px 8px 0 0;
`;

const ResumeSetProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [myKeywords, setMyKeywords] = useState<string[] | []>([]);
  const [isPublicEmail, setIsPublicEmail] = useState(true);
  const [isPublicTel, setisPublicTel] = useState(false);
  //
  const [legnthExceed, setLengthExceed] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");

  // 이메일 퍼블릭 버튼
  const togglePublicEmailBtn = () => setIsPublicEmail((prev) => !prev);
  // 전화번호 퍼블릭 버튼
  const togglePublicTelBtn = () => setisPublicTel((prev) => !prev);

  const hasUpdateIntroduce = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setIntroduce(value);
    if (value.length > 30) {
      setLengthExceed(true);
    } else {
      setLengthExceed(false);
    }
  };

  const handleKeywordInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && currentKeyword) {
      if (currentKeyword.length >= 6)
        return alert("6글자 이내로 작성 부탁드립니다.");
      if (myKeywords.length >= 5)
        return alert("키워드는 5개까지만 추가가능 합니다.");
      setMyKeywords([...myKeywords, currentKeyword]);
      setCurrentKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const updatedKeywords = myKeywords.filter(
      (keyword) => keyword !== keywordToRemove
    );
    setMyKeywords(updatedKeywords);
  };

  const handleUploadPortfolio = () => {
    const emailCheck = validateEmail(email);
    if (name.trim().length < 2) return alert("이름을 제대로 입력해 주세요!");
    if (!emailCheck) return alert("올바른 이메일 작성 부탁드립니다");
  };

  return (
    <>
      <ResumeForm>
        <ResumeContainer>
          <ResumeMainTitle>개인정보 보호</ResumeMainTitle>
          <ResumeSubTitle>
            비공개 정보는 다른 사용자에게 보이지 않습니다.
          </ResumeSubTitle>
        </ResumeContainer>
        <ResumeLabel>이름</ResumeLabel>
        <ResumeInput
          placeholder="이름을 입력해 주세요"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <ResumeLabel>이메일</ResumeLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ResumeInput
            placeholder="이메일을 입력해 주세요"
            className="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <ResumText>{isPublicEmail ? "공개" : "비공개"} </ResumText>
            <ToggleContainer
              $isPublic={isPublicEmail}
              onClick={togglePublicEmailBtn}
            >
              <ToggleSwitch $isPublic={isPublicEmail} />
            </ToggleContainer>
          </div>
        </div>

        <ResumeLabel>휴대폰 번호</ResumeLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ResumeInput
            placeholder="휴대폰 번호를 입력해 주세요"
            className="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <ResumText>{isPublicTel ? "공개" : "비공개"}</ResumText>
            <ToggleContainer
              $isPublic={isPublicTel}
              onClick={togglePublicTelBtn}
            >
              <ToggleSwitch $isPublic={isPublicTel} />
            </ToggleContainer>
          </div>
        </div>

        <ResumeLabel>분야 / 직무</ResumeLabel>
        <FiledJob />

        <ResumeLabel>소개글</ResumeLabel>
        <div className="introduce" style={{ position: "relative" }}>
          <ResumeTextarea
            placeholder="나를 잘 표현하는 멋진 소개문구를 적어주세요"
            onChange={hasUpdateIntroduce}
          />
          <ResumIntroduceTextLength $legnthExceed={legnthExceed}>
            ({introduce.length}/30)
          </ResumIntroduceTextLength>
        </div>

        <ResumeLabel>키워드 (최대 5개 입력)</ResumeLabel>
        <ResumeInput
          placeholder="나를 잘 나타내는 핵심 키워드를 입력해보세요 (최대 5개)"
          onChange={(e) => setCurrentKeyword(e.target.value)}
          onKeyDown={handleKeywordInputKeyDown}
          value={currentKeyword}
          type="text"
        />

        {myKeywords?.map((keyword, index) => (
          <ResumeUserKeywords key={index}>
            {keyword}
            <span
              onClick={() => handleRemoveKeyword(keyword)}
              style={{ cursor: "pointer" }}
            >
              &nbsp;&nbsp;X
            </span>
          </ResumeUserKeywords>
        ))}
      </ResumeForm>
      <ResumeFooterTitle
        title="포트폴리오 업로드 하러가기"
        onClick={handleUploadPortfolio}
      />
    </>
  );
};

export default ResumeSetProfileForm;
