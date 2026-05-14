require("dotenv").config();
const express = require("express");
// import express from "express";
const cors = require("cors");
const { post } = require("axios");

const app = express();

app.use(cors(
    {
        origin: "https://vps-1ba6b25b.vps.ovh.net/"
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

app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on port 3001");
});