import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from 'src/context/AuthContext';

type Theme = 'light' | 'dark';

const AppHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const theme: Theme = 'dark';

  return (
    <header className="header">
      <Navbar variant={theme} bg={theme} className="w-100">
        <div className="container">
          <Link href="/">
            <Navbar.Brand>Logo + social links</Navbar.Brand>
          </Link>
          <div className="d-flex align-items-center ml-auto text-light">
            {!user ? (
              <>
                <Link href="/login" prefetch={false}>
                  <Button variant="link" className="text-light">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register" prefetch={false}>
                  <Button variant="primary">Sign up</Button>
                </Link>
              </>
            ) : (
              <>
                <span className="font-weight-bold ml-1">{user.email}</span>
                <Link href="/places/add">
                  <Button variant="success" className="text-light ml-3">
                    Add place
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  className="text-light ml-3"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
              // </Navbar.Text>
            )}
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default AppHeader;
