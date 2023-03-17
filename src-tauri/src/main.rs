// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Serialize};
use std::fs;
use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_default_settings() -> String {
    fs::read_to_string("../src/projectsData/project_manager_settings.json").expect("Unable to read file")
}


#[derive(Serialize)]
struct Config {
    default_folder: String,
}

#[tauri::command]
fn update_settings(settings: &str) {
    match fs::write("../src/projectsData/project_manager_settings.json", &settings){
        Ok(_res) =>  println!("The file was succesfully updated!"),
        Err(_err) => println!("An error occured while writing the file!{}", _err)
    }
}

#[tauri::command]
fn create_project(project_name: &str, selected_path: &str) {
    match Command::new("cmd")
        .arg("/C")
        .arg("mkdir")
        .arg(format!("{selected_path}\\{project_name}"))
        .output(){
            Ok(_res) =>  println!("The operatio was successfull!"),
            Err(_err) => println!("An error occured while executing the command! {}", _err)
        }
}


/* fn convert_to_json(new_default_folder: &str) -> String {
    let config = Config {
        default_folder: new_default_folder.to_string(),
        // Add any other fields you have in your JSON config file
    };
    match serde_json::to_string(&config) {
        Ok(_res) => _res.to_string(),
        Err(_err) => _err.to_string(),
    }
} */


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_default_settings, update_settings, create_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



