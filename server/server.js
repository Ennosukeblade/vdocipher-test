require("dotenv").config();
const express = require("express");
// import express from "express";
const cors = require("cors");
const { post, get } = require("axios");

const app = express();

const BASE_URL = process.env.VDOCIPHER_BASE_URL || "http://localhost:3001";

app.use(cors(
    {
        origin: BASE_URL
    }
));

const VIDEO_ID = process.env.VDOCIPHER_VIDEO_ID;

app.get("/otp", async (req, res) => {
    try {
        console.log("Get Request Established")
        const response = await post(
            `https://dev.vdocipher.com/api/videos/${VIDEO_ID}/otp`,
            {
                ttl: 300,
                annotate: JSON.stringify([
                    {
                        type: "rtext",
                        text: "User: test@example.com",
                        alpha: "0.12",
                        color: "0xFFFFFF",
                        size: "8",
                        interval: "5000",
                        skip: "5000"
                    }
                ])
            },
            {
                headers: {
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);

        res.status(500).json({
            error: "Failed to generate OTP",
        });
    }
});

app.get("/live", async (req, res) => {
    try {
        console.log("Live Get Request Established")
        const response = await get(
            //`https://www.vdocipher.com/api/livestream/${process.env.VDOCIPHER_LIVE_STREAM_ID}`
            "https://www.vdocipher.com/api/livestream",
            {
                headers: {
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
                },
            }
        );
        console.log(response.data)
        res.json(response.data);
    } catch (err) {
        console.error("catch scope accessed")
        console.error(err.response?.data || err.message);

        res.status(500).json({
            error: "Failed to fetch livestream details",
        });
    }
});


app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on port 3001");
});