import { useState } from 'react';
import styled from 'styled-components';
import { Theme } from 'hooks/useDarkMode';
import Light from 'assets/light-theme.svg';
import Dark from 'assets/dark-theme.svg';
const ToggleThemeButton = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 30px;
  background: 'black';
  align-items: center;
  justify-content: center;
  cursor: pointer;
  elevation: 5;
  border:solid 1px rgba(0,0,0,0.1);
`;

const ThemeToggle1: React.VFC<{ toggleTheme: () => void }> = ({
  toggleTheme,
}) => {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem('theme') === Theme.Dark
  );
    const onClickHandler = ()=>{
      setIsChecked((isChecked) => !isChecked);
      toggleTheme();
    }
  return (
    <>
      <ToggleThemeButton onClick = {onClickHandler} >
        {isChecked || <img style = {{width:'70%',height: "70%", marginLeft:6, marginTop:4}} src={Dark} alt="" />}
        {!isChecked || <img style = {{width:'70%',height: "70%", marginLeft:6, marginTop:4}}  src={Light} alt="" />}
      </ToggleThemeButton>
    </>
  );
};

export default ThemeToggle1;
