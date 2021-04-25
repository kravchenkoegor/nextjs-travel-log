import AppHeader from 'src/components/shared/AppHeader';
import AppFooter from 'src/components/shared/AppFooter';

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className="main-content" data-theme="dark">
        {children}
      </main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
