import Header from "./Header";

const Content = ({ children }) => {
  return (
    <div className="db-content">
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Content;
