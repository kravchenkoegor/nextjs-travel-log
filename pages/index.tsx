import CardsList from 'src/components/CardsList';
import Map from 'src/components/Map';

const HomePage: React.FC = () => {
  /* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */

  return (
    <div className="container-fluid pr-0">
      <div className="row">
        <div className="col-12 col-xl-6 pr-0">
          <CardsList />
        </div>
        <div className="col-12 col-xl-6">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
