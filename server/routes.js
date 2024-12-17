const express = require("express");
const BrawlStarsAPI = require("./api");
require("dotenv").config();

const router = express.Router();
const api = new BrawlStarsAPI(process.env.BRAWL_API_TOKEN);

// ---- PLAYER ROUTES ----
router.get("/players/:tag", async (req, res) => {
	try {
		const data = await api.getPlayer(`#${req.params.tag}`);
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.get("/players/:tag/battlelog", async (req, res) => {
	try {
		const data = await api.getPlayerBattleLog(req.params.tag);
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// ---- CLUB ROUTES ----
router.get("/clubs/:tag", async (req, res) => {
	try {
		const data = await api.getClub(req.params.tag);
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.get("/clubs/:tag/members", async (req, res) => {
	try {
		const data = await api.getClubMembers(req.params.tag);
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// ---- EVENTS ROUTE ----
router.get("/events", async (req, res) => {
	try {
		const data = await api.getEvents();
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// ---- RANKINGS ROUTE ----
router.get("/rankings/:type", async (req, res) => {
	const { country, brawlerId } = req.query;
	try {
		const data = await api.getRankings(req.params.type, country, brawlerId);
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// ---- BRAWLERS ROUTES ----
router.get("/brawlers", async (req, res) => {
	try {
		const data = await api.getAllBrawlers();
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.get("/brawlers/:id", async (req, res) => {
	try {
		const data = await api.getBrawler(req.params.id);
		res.json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
