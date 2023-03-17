import { useRef } from "react";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";

export default function Home() {
  const projectNameRef = useRef();
  const createProject = async () => {
    const projectName = projectNameRef.current.value;
    const selectedPath = await open({
      directory: true,
      multiple: false,
    });
    invoke("create_project", { projectName, selectedPath });
  };
  return (
    <>
      <div className="place-center-wraper">
        <h1>Home</h1>
        <input ref={projectNameRef} type="text" />
        <button onClick={createProject}>create project</button>
      </div>
    </>
  );
}
