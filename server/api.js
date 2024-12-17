const axios = require("axios");

class BrawlStarsAPI {
	constructor(token) {
		if (!token) throw new Error("API token is required.");
		this.client = axios.create({
			baseURL: "https://api.brawlstars.com/v1",
			headers: { Authorization: `Bearer ${token}` },
		});
	}

	async request(endpoint, params = {}) {
		try {
			const response = await this.client.get(endpoint, { params });
			return response.data;
		} catch (error) {
			throw error.response ? error.response.data : new Error("Unknown error");
		}
	}

	getPlayer(tag) {
		return this.request(`/players/${encodeURIComponent(tag)}`);
	}

	getPlayerBattleLog(tag) {
		return this.request(`/players/${encodeURIComponent(tag)}/battlelog`);
	}

	getClub(tag) {
		return this.request(`/clubs/${encodeURIComponent(tag)}`);
	}

	getClubMembers(tag) {
		return this.request(`/clubs/${encodeURIComponent(tag)}/members`);
	}

	getEvents() {
		return this.request("/events/rotation");
	}

	getRankings(type, country, brawlerId) {
		const endpoint = brawlerId
			? `/rankings/${country}/${type}/${brawlerId}`
			: `/rankings/${country}/${type}`;
		return this.request(endpoint);
	}

	getBrawler(brawlerId) {
		return this.request(`/brawlers/${brawlerId}`);
	}

	getAllBrawlers() {
		return this.request("/brawlers");
	}
}

module.exports = BrawlStarsAPI;
