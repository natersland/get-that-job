import React from "react";
import styled from "@emotion/styled";
import { useUserData } from "../../contexts/usersData";
//const UsersDataContext = React.createContext();


function UpdatePersonalProfile() {
    const {email,
        setEmail,
        name,
        setName,
        phone,
        setPhone,
        companyWebsite,
        setCompanyWebsite,
        birthDate,
        setBirthDate,
        linkin,
        setLinkin,
        title,
        setTitle,
        experience,
        setExperience,
        education,
        setEducation,
        uploadFiles,
        setUploadFiles,} = useUserData();

        const handleFileChange = (event) => {
            const uniqueId = Date.now();
            setUploadFiles({
              ...uploadFiles,
              [uniqueId]: event.target.files[0],
            });
            
          };
  return (
    <MarginWrap>
      <Texth1>Profile</Texth1>
      <Texth3>Personal Information</Texth3>

      <Form id="update-Professional-form"/*  onSubmit={handleSubmit} */>

        <LabelText htmlFor="email">COMPANY EMAIL</LabelText>
        <Input
          type="email"
          className="gtj-input pink-border"
          id="email"
         value={email}
         onChange={(event) => setEmail(event.target.value)}
        />

        <LabelText>NAME</LabelText>
        <Input
          type="text"
          className="gtj-input pink-border"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <LabelText>PHONE</LabelText>
        <Input
        type="number"
        className="gtj-input pink-border"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        />
        <LabelUnder>+[country code][number]</LabelUnder> 

        <LabelText>COMPANY WEBSITE</LabelText>
        <Input
          type="url"
          className="gtj-input pink-border"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)} 
        />

        <LabelText>BIRTHDAY</LabelText>
        <Input
          type="date" 
          /* data-date-inline-picker="true"  */
          //data-date="" data-date-format="DD MMMM YYYY"
          className="gtj-input pink-border"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />

        <LabelText>LINKEDIN URL</LabelText>
        <Input
          type="url" 
          className="gtj-input pink-border"
          value={linkin}
          onChange={(event) => setLinkin(event.target.value)} 
        />
        
        
            <Texth4>Professional Information</Texth4>
            <P>changes you made here will be reflected in your future application</P>
            <LabelText>TITLE</LabelText>
        <Input
          type="text"
          className="gtj-input pink-border"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <LabelText>PROFESSIONAL EXPERIENCE</LabelText>
        <Textarea
          className="gtj-input pink-border"
          cols="60"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />
        <LabelText>EDUCATION</LabelText>
        <Textarea
          className="gtj-input pink-border"
          cols="40"
          value={education}
          onChange={(event) => setEducation(event.target.value)}
        />


        <CompanyLogoWrap>
          
          <InputFileWrap>
            <Label2>UPLOAD/UPDATE YOUR CV</Label2>
            <UploadFileSection>
              <Input1
                id="uploadCV"
                name="CV"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                maxSize={5}
              />
            </UploadFileSection>
            <Limitation>Only PDF Max size 5MB</Limitation>
          </InputFileWrap>
        </CompanyLogoWrap>

        <Button
          form="update-Professional-form"
          type="submit"
          className="btn btn-md btn-pink">
          SAVE CHANGE
        </Button>
      </Form>
    </MarginWrap>
  );
}
export default UpdatePersonalProfile;


const Texth1 = styled.h1`
  font-size: 37px;
  letter-spacing: 0.25px;
  font-weight: 400;
  font-family: var(--primary-font);
`;

const Texth3 = styled.p`
  font-size: 24px;
  line-height: 29.26px;
  font-weight: 400;
  font-family: var(--primary-font);
  margin-top: 15px;
`;

const Texth4 = styled.p`
  font-size: 24px;
  line-height: 29.26px;
  font-weight: 400;
  font-family: var(--primary-font);
  margin-top: 35px;
`;
const MarginWrap = styled.div`
  margin-left: 300px;
  padding-top: 30px;
  margin-bottom: 50px;
`;

const Button = styled.button`
  margin-top: 24px;
  width: 195px;
  text-align: center;
  letter-spacing: 1.35px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 400px;
`;
const Textarea = styled.textarea`
  width: 950px;
  height: 200px;
`;

const Label2 = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
  color: #616161;
  margin-top: 10px;
  margin-bottom: 3px;
`;

const LabelUnder = styled.label`
  font-family: var(--seconary-font);
  font-size: 12px;
  color:#8E8E8E;
  line-height: 30px;
  ;
`;
const UploadFileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;

const Input1 = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;
  color: #8e8e8e;
`;

const P = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  color: #616161;
  font-size: 12px;
`;


const Limitation = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 1.5px;
  width: 380px;
  margin-top: 0px;
  color: #8e8e8e;
`;
const CompanyLogoWrap = styled.div`
  display: flex;
`;
const InputFileWrap = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LabelText = styled.label`
  font-size: 10px;
  color: var(--primary-text-color);
  font-family: var(--seconary-font);
  letter-spacing: 1.5px;
  padding-top: 5px;
  padding-bottom: 5px;
`;