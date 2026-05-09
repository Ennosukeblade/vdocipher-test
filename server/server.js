require("dotenv").config();
const express = require("express");
// import express from "express";
const cors = require("cors");
const { post } = require("axios");

const app = express();

app.use(cors());

const VIDEO_ID = process.env.VDOCIPHER_VIDEO_ID;

app.get("/otp", async (req, res) => {
    try {
        console.log("Get Request Established")
        const response = await post(
            `https://dev.vdocipher.com/api/videos/${VIDEO_ID}/otp`,
            {
                ttl: 300,
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