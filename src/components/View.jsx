import SideBar from "./SideBar";

const View = ({ children }) => {
  return (
    <div className="font-manrope flex">
      <SideBar />
      <main className="px-10 py-10 flex-1 ml-72">{children}</main>
    </div>
  );
};
export default View;
