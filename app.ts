import { config as envConfig } from "dotenv"
envConfig()
const express = require('express');
import server from "./src/application/config/server";


server(express)
