import styled from "styled-components";
import { useEffect } from "react";
import { open } from "@tauri-apps/api/dialog";
import { getSettings, setSettings } from "../utils/settings.js";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  //Check if default path is set
  useEffect(() => {
    getSettings().then((settings) => {
      if (settings.default_folder) navigate("/home");
    });
  }, []);

  const openFolder = async () => {
    //Select default path
    const selectedPath = await open({
      directory: true,
      multiple: false,
    });
    //Set default path
    const settings = await getSettings();
    settings.default_folder = selectedPath;
    setSettings(settings);
    //Redirect to home
    navigate("/home");
  };
  return (
    <Wraper>
      <h1>Welcome</h1>
      <p>Please set default project directory</p>
      <button onClick={openFolder}>set</button>
    </Wraper>
  );
}

const Wraper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;
