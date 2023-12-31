// React
import { useEffect, useState } from "react";

// Util
import validateEmail from "../../../util/validateEmail";

// CSS
import styled from "styled-components";

// Components
import FiledJob from "../../Card/FiledJob";
import ResumeFooterTitle from "../ResumFooterTitle";

import { validateProfileEditInfoValue } from "../../../service/profile";

const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0px 0 20px 0;
  font-family: Pretendard;
  @media screen and (max-width: 599px) {
    padding-bottom: 28px;
  }
`;

const ResumeForm = styled.form`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 599px) {
    padding: 80px 20px 100px 20px;
    box-sizing: border-box;
  }

  @media screen and (min-width: 600px) {
    padding: 0 20px;
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

interface Props {
  updateStatusBtn: (value: boolean) => void;
}

const ResumeSetProfileForm = ({ updateStatusBtn }: Props) => {
  // input 사용자 정보
  const [form, setForm] = useState({
    name: "",
    email: "",
    tel: "",
    introduce: "",
  });

  // 키워드 배열
  const [myKeywords, setMyKeywords] = useState<string[] | []>([]);

  const [hasFiledJob, setHasFiledJob] = useState(false);

  // 이메일, 전화번호 공개 비공개
  const [isPublicEmail, setIsPublicEmail] = useState(true);
  const [isPublicTel, setisPublicTel] = useState(false);

  // 현재 문자열 길이, 맥시멈 길이
  const [legnthExceed, setLengthExceed] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");

  useEffect(() => {
    const { name, email, tel, introduce } = form;
    const emailCheck = validateEmail(email);
    if (
      name.trim().length >= 2 &&
      emailCheck === true &&
      tel.trim().length > 5 &&
      introduce.trim().length > 5 &&
      myKeywords.length >= 1 &&
      hasFiledJob === true
    ) {
      return updateStatusBtn(true);
    }
    updateStatusBtn(false);
  }, [form, myKeywords, currentKeyword, hasFiledJob]);

  // 이메일 퍼블릭 버튼
  const togglePublicEmailBtn = () => setIsPublicEmail((prev) => !prev);
  // 전화번호 퍼블릭 버튼
  const togglePublicTelBtn = () => setisPublicTel((prev) => !prev);

  // input 값 업데이트
  const updateInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.length > 30) {
      setLengthExceed(true);
    } else {
      setLengthExceed(false);
    }
  };

  // 키워드 추가 함수
  const handleKeywordInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (currentKeyword.trim().length < 2) {
        setCurrentKeyword("");
        return alert("키워드는 2글자 이상 작성 부탁드립니다.");
      }
      if (currentKeyword.length >= 6) {
        setCurrentKeyword("");
        return alert("6글자 이내로 작성 부탁드립니다.");
      }
      if (myKeywords.length >= 5) {
        setCurrentKeyword("");
        return alert("키워드는 5개까지만 추가가능 합니다.");
      }
      setMyKeywords([...myKeywords, currentKeyword]);
      setCurrentKeyword("");
    }
    return;
  };

  // 키워드 삭제 함수
  const handleRemoveKeyword = (keywordToRemove: string) => {
    const updatedKeywords = myKeywords.filter(
      (keyword) => keyword !== keywordToRemove
    );
    setMyKeywords(updatedKeywords);
  };

  // PC 다음 페이지 버튼
  const handleUploadPortfolio = () => {
    const { name, email, tel, introduce } = form;
    const emailCheck = validateEmail(email);
    if (name.trim().length < 2) return alert("이름을 제대로 입력해 주세요!");
    if (!emailCheck) return alert("올바른 이메일 작성 부탁 드립니다 !");
    if (tel.trim().length < 5)
      return alert("핸드폰 번호의 길이는 최소 5글자 이상 입니다 !");
    if (introduce.trim().length > 30)
      return alert("자기소개는 30글자 이내로 가능 합니다 !");
    if (introduce.trim().length < 5)
      return alert("5글자 이상으로 자기소개를 작성해 주세요!");
    validateProfileEditInfoValue({ ...form, myKeywords });
  };

  // 직무/분야 선택 여부 확인 props 함수
  const updateFiledJob = (value: boolean) => setHasFiledJob(value);

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
          value={form.name}
          name="name"
          onChange={updateInputValue}
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
            name="email"
            value={form.email}
            onChange={updateInputValue}
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
            value={form.tel}
            name="tel"
            onChange={updateInputValue}
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
        <FiledJob updateFiledJob={updateFiledJob} />

        <ResumeLabel>소개글</ResumeLabel>
        <div className="introduce" style={{ position: "relative" }}>
          <ResumeTextarea
            placeholder="나를 잘 표현하는 멋진 소개문구를 적어주세요"
            name="introduce"
            value={form.introduce}
            onChange={updateInputValue}
          />
          <ResumIntroduceTextLength $legnthExceed={legnthExceed}>
            ({form.introduce.length}/30)
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
