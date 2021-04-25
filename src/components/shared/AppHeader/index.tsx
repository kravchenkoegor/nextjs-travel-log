import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

type Theme = 'light' | 'dark';

const AppHeader: React.FC = () => {
  const theme: Theme = 'dark';

  const isAuth = false;

  return (
    <header className="header">
      <Navbar variant={theme} bg={theme} className="w-100">
        <Container>
          <Link href="/">
            <Navbar.Brand>Logo + social links</Navbar.Brand>
          </Link>
          <div className="ml-auto">
            {!isAuth ? (
              <>
                <Link href="/auth" prefetch={false}>
                  <Button variant="link" className="text-light">
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth" prefetch={false}>
                  <Button variant="primary">Sign up</Button>
                </Link>
              </>
            ) : (
              <Navbar.Text>Signed in as: Mark Otto</Navbar.Text>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default AppHeader;
