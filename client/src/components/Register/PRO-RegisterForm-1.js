import styled from "@emotion/styled";
// Contexts -------------------------------------------
import { useUserData } from "../../contexts/usersData";

function ProRegisterForm1() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmed,
    setPasswordConfirmed,
  } = useUserData();

  return (
    <div>
      <Container>
        <Label htmlFor="email">EMAIL*</Label>
        <Input
          id="email"
          name="email"
          type="email"
          className="gtj-input pink-border"
          placeholder="some.user@mail.com"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        {!email.includes("@") && !email.includes(".")  && email.length > 1 ? (
          <span className="error-message">
            It should be a valid email address!
          </span>
        ) : null}
      </Container>
      <Container>
        <Label htmlFor="password">PASSWORD*</Label>
        <Input
          id="password"
          name="password"
          type="password"
          className="gtj-input pink-border"
          placeholder="**********"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />

        {password.length > 1 && password.length < 6 || password.length > 18 ? (
          <span className="error-message">
            Password should be 6-18 characters.
          </span>
        ) : null}
      </Container>
      <Container>
        <Label htmlFor="password-confiremed">PASSWORD CONFORMATION*</Label>
        <Input
          id="password-confiremed"
          name="password-confiremed"
          type="password"
          className="gtj-input pink-border"
          placeholder="**********"
          onChange={(event) => {
            setPasswordConfirmed(event.target.value);
          }}
          value={passwordConfirmed}
        />
        {password !== passwordConfirmed ? (
          <span className="error-message">
            Password comfirmation must be the same as password.
          </span>
        ) : null}
      </Container>
    </div>
  );
}

const Input = styled.input`
  width: 380px;
  height: 39px;
  border-radius: 8px;
  border: 1px solid var(--secoundary-brand-color);
  margin-bottom: 16px;
  padding-left: 10px;
  padding-right: 10px;
  color: #8e8e8e;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;

const Label = styled.label`
  font-size: 400;
  font-size: 10px;
  line-height: 12.1px;
  margin-top: 4px;
  color: var(--primary-text-color);
  font-family: var(--secondary-text-colo);
`;
export default ProRegisterForm1;
