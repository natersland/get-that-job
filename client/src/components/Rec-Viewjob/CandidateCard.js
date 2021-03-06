import React , { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { useVadilation } from "../../contexts/vadilation";
import AlertDialog from "../Utilities/AlertDialog";
import styled from "@emotion/styled";
import "../../App.css";
import closedMail from "../../img/closedMail.png";
import waiting from "../../img/waiting.png";
import Phone1 from "../../img/phone.png";
import IN from "../../img/linkedin-box-line.png";
import IconWithText from "../SharedComponents/IconWithText";
import ToggleCard from "../SharedComponents/ToggleCard";
import load from "../../img/download-line.png";


function CandidateCard1 ({
  name,
  email,
  phone,
  linkedin,
  experience,
  createdJobDate,
  CV
})
{

  const CandidateCardHeader = () => {
    const userRole = localStorage.getItem("role");
    const { fistLogIn } = useVadilation();

    return( 
                <BeforeToggleCard>
                    {fistLogIn ? (
                    <AlertDialog textDialog={`Login successful! Welcome ${userRole}`} />
                    ) : null}
                    <CandidateLeftCard>
                        <CandidateDiv>
                         <CandidateName>{name}</CandidateName> 
                        </CandidateDiv>

                        <MainInformation>
                            <MainInformation1>
                            <INImg>
                                <img src={IN} />
                            </INImg>
                                <TextInfo>{linkedin}</TextInfo>                         
                            </MainInformation1>
                        </MainInformation>
                    </CandidateLeftCard>

                    <CandidateCenterCard>
                        <CandidateCenterCard1>
                                <Email>
                                    <Icon><img src={closedMail}/></Icon>
                                    <EmailText>{email}</EmailText>
                                </Email>
                                <Phone>
                                    <Icon><img src={Phone1}/></Icon>
                                    <PhoneText>{phone}</PhoneText>  
                                </Phone>                          
                        </CandidateCenterCard1>

                        <CandidateCenterCard2>
                            <IconWithText icon={closedMail}/>
                            <Text3>
                            Sent on 
                            <br/>
                            {createdJobDate}
                            </Text3>
                        </CandidateCenterCard2>

                        <CandidateCenterCard3>
                            <IconWithText icon={waiting} text={'Waiting for review'}/>
                        </CandidateCenterCard3>

                    </CandidateCenterCard>   

                    <CandidateRightCard>
                            <MarkTextButton>
                                <MarkText>MARK AS STARTED</MarkText>
                            </MarkTextButton>
                    </CandidateRightCard> 
                </BeforeToggleCard>
    )}

    const CandidateContent = () => {
      return (
        <div>
        <CandidateDetails>
              <CandidateDetails1>
                  <Title>Professional experience</Title>
                  <CandidateDetails2>
                    <Detail>
                    {experience}
                    </Detail>
                  </CandidateDetails2>
              </CandidateDetails1>
        </CandidateDetails>

        <Dowload>
            <DowloadButton
              className={`btn ${
                CV === null || !CV ? "btn-gray" : "btn-active"
             } `}
              href={CV}
              target="_blank"
              
            >
            <Icon><img src={load}/></Icon>
            <MarkText statusBtn={ CV === null || !CV ? false : true}>
              {CV === null || !CV
                ? "No CV File"
                : "Download CV"}
             </MarkText>
            </DowloadButton>
        </Dowload> 
        </div>
      )
    }
  
  return (
      <Wrapper2>
        <ToggleCard header={CandidateCardHeader()} content={CandidateContent()} />
      </Wrapper2>
    );
    }

export default CandidateCard1;

const Wrapper2 = styled.div`
  width: 980px;
  border-radius: 8px;
`;
//----------------------------------------Before toggle---------------------------------------------------------//
const BeforeToggleCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15px;
`;

const MainInformation = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainInformation1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 105px;
`;
const Icon = styled.div`
  width: 13px;
  height: 13px;
  margin-bottom: 3px;
  display: flex;
  justify-content: center;
`;
const IconLabel = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: var(--gray);
  font-weight: 400;
  margin-left: 5px;
  line-height: 16px;
  text-align:center;
`;

const TextInfo = styled.p`
  font-size: 12px;
  font-family: var(--primary-font);
  color: var(--light-gray);
  font-weight: 400;
`;

const ToggleButton = styled.button`
    margin-right: 10px;
    margin-top: 40px;
`;

const CandidateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 285px;
  margin-top: 3px;
`;

const CandidateName = styled.p`
  font-size: 20px;
  font-family: var(--primary-font);
  color: var(--primary-text-color);
  font-weight: 500;
  
`;

const CandidateLeftCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 280px;
  margin-bottom: 5px;
`;

const INImg = styled.div`
  width: 15.5px;
  height: 15.5px;
  margin-right: 5px;
`;

const CandidateCenterCard = styled.div` 
  width: 415px;
  display: flex;
  flex-direction: row;
`;

const CandidateCenterCard1 = styled.div` 
  width: 180px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
`;

const CandidateCenterCard2 = styled.div` 
  width: 85px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

const CandidateCenterCard3 = styled.div` 
  width: 85px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;


const CandidateRightCard = styled.div` 
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Email = styled.div` 
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Phone = styled.div` 
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const EmailText = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 5px;
`;

const PhoneText = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 5px;
`;

const MarkText = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 5px;
  color: ${(props) =>
    !props.statusBtn ? "gray" : "white"};
`;
const MarkTextButton = styled.button`
  width: 150px;
  height: 35px;
  font-weight: 500px;
  color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border:1px solid pink;
`;

const DowloadButton = styled.a`
  width: 150px;
  height: 35px;
  font-weight: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border:1px solid pink;


`;

//----------------------------------------After toggle---------------------------------------------------------//

const CandidateDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 25px;
`;

const CandidateDetails1 = styled.div`
  margin-bottom: 5px;
`;

const CandidateDetails2 = styled.div`
  margin-top: 5px;
`;

const Title = styled.p`
  font-size: 16px;
  font-family: var(--primary-font);
  color: var(--primary-brand-color);
  font-weight: 400;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  width: 760px;
`;

const Dowload = styled.div` 
  width: 944px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
`;

//-----------------------------------------------------------------text---------------------------------------------//
const Text3 = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: #616161;
  font-weight: 400;
  margin-left: 8px;
  text-align:center;
  letter-spacing: 0.4px;
  line-height: 16px;
`;