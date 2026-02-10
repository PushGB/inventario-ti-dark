import axios from "axios";
import { Equipo } from "../models/equipo";

const API_URL = "http://10.8.30.13:8080/api/Equipo";

export const getEquipos = async (): Promise<Equipo[]> => {
    const response = await axios.get<Equipo[]>(
        `${API_URL}/equipos`
    );
    return response.data;
};

