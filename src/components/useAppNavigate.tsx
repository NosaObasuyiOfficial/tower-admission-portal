import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function useAppNavigate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  return {
    goTo: (path: string) => navigate(path),
    replaceWith: (path: string) => navigate(path, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    getParams: (name: string) => searchParams.get(name),
    getLocation: () => location,
  };
}

export default useAppNavigate;
