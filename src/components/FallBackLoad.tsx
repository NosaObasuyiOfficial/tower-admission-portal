import Logo from "../assets/images/towerlogo.png";

function FallBackLoad() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-white relative">
        <img
          className="w-24 h-24 bg-white rounded-full logo-pulse"
          src={Logo}
          alt="Tower Logo"
        />
      </div>
    </>
  );
}

export default FallBackLoad;
