import styled from 'styled-components';

import Navbar from './Navbar';

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${(props) => props.theme.backgroundColors.primary};
`;

const Layout: React.FC<{ toggleTheme: () => void }> = ({
  toggleTheme,
  children,
}) => {
  return (
    <LayoutWrapper>
      <Navbar toggleTheme={toggleTheme} />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
