import axios from "axios";
import { Riff } from "./types";

const API_URI = process.env.NODE_ENV === "development" ? "http://localhost:5000/" : "https://api.improviser.education/";

const client = axios.create({
    baseURL: API_URI,
    withCredentials: true
});

export function get_paginated_scales(range = [0, 10], sort = ["start_date", "desc"], filter: string) : Promise<Riff[]> {
    return fetchJson(`/v1/exercises/scales/?range=${range}&sort=${sort}&filter=${filter}`);
}

function fetchJson<R = {}>(
    path: string,
    options = {},
    headers = {},
    showErrorDialog = true,
    result = true
): Promise<R> {
    return axiosFetch(path, options, headers, showErrorDialog, result);
}

function axiosFetch<R = {}>(
    path: string,
    options = {},
    headers = {},
    showErrorDialog = true,
    result = true
): Promise<R> {
    // preset the config with the relative URL and a GET type.
    // presets can be overridden with `options`.
    return client({ url: path, method: "GET", ...options })
        .then(res => res.data)
        .catch(err => {
            if (showErrorDialog) {
                setTimeout(() => {
                    throw err;
                }, 250);
            }
            throw err;
        });
}