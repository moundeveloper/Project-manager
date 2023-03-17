import { invoke } from "@tauri-apps/api";

const getSettings = async () => {
  const rawData = await invoke("get_default_settings");
  const settings = JSON.parse(rawData);
  return settings;
};

const setSettings = (settings) => {
  invoke("update_settings", { settings: JSON.stringify(settings) });
};

export { getSettings, setSettings };
