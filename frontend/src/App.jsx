import { useState } from "react";
import {
	Search,
	BarChart2,
	Trophy,
	Users,
	ArrowRight,
	Loader2,
} from "lucide-react";

const BrawlStarsStats = () => {
	const [tag, setTag] = useState("");
	const [playerStats, setPlayerStats] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [recentSearches, setRecentSearches] = useState([
		{
			name: "Juan el pro",
			trophies: "25,430",
		},
		{
			name: "Tomar573",
			trophies: "30,150",
		},
		{
			name: "Symantic	",
			trophies: "28,760",
		},
	]);

	const handleSearch = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setPlayerStats(null);

		try {
			const response = await fetch(`http://localhost:5000/api/players/${tag}`);
			if (!response.ok) {
				throw new Error("Failed to fetch player stats");
			}
			const data = await response.json();
			setPlayerStats(data);
			updateRecentSearches(data);
		} catch (err) {
			setError("Error fetching player stats. Please try again.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const updateRecentSearches = (newPlayer) => {
		setRecentSearches((prevSearches) => {
			const updatedSearches = [
				{
					name: newPlayer.name,
					trophies: newPlayer.trophies.toString(),
				},
				...prevSearches.filter((player) => player.name !== newPlayer.name),
			].slice(0, 3);
			return updatedSearches;
		});
	};
	const handlePrevious = (tag) => async () => {
		setTag(tag);
		handleSearch();
	};

	return (
		<div className="min-h-screen bg-[#0A0F1C] text-white font-mono">
			<nav className="border-b border-gray-800 px-6 py-4">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Trophy className="w-6 h-6 text-purple-500" />
						<span className="font-bold text-xl">AboutMyBrawl</span>
					</div>
					<div className="flex gap-6">
						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a href="#" className="hover:text-purple-400 transition-colors">
							Home
						</a>

						<a
							href="#about"
							className="hover:text-purple-400 transition-colors"
						>
							About
						</a>
					</div>
				</div>
			</nav>
			<div className="max-w-4xl mx-auto text-center py-20 px-4">
				<h1 className="text-4xl font-bold mb-6">AboutMyBrawl</h1>
				<p className="text-gray-400 mb-8">
					Track your Brawl Stars stats, view detailed statistics, and monitor
					your progress over time. Enter your player tag to get started.
				</p>
				<form onSubmit={handleSearch} className="flex justify-center mb-16">
					<div className="relative w-full max-w-md">
						<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
							#
						</span>
						<input
							type="text"
							value={tag}
							onChange={(e) => setTag(e.target.value)}
							className="w-full bg-gray-900/50  border border-gray-800 rounded-l-lg py-3 px-10 focus:outline-none focus:border-purple-500"
							placeholder="Enter your player tag"
						/>
						<button
							type="submit"
							className="absolute right-0 top-0 h-full px-6 bg-purple-600 rounded-r-lg hover:bg-purple-700 transition-colors flex items-center"
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader2 className="w-5 h-5 animate-spin" />
							) : (
								<Search className="w-5 h-5" />
							)}
						</button>
					</div>
				</form>
				{error && (
					<div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-8">
						{error}
					</div>
				)}
				{playerStats && (
					<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-16">
						<h2 className="text-2xl font-bold mb-4">{playerStats.name}</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<h3 className="text-sm text-gray-400 mb-1">Trophies</h3>
								<p className="text-xl font-bold">{playerStats.trophies}</p>
							</div>
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<h3 className="text-sm text-gray-400 mb-1">Highest Trophies</h3>
								<p className="text-xl font-bold">
									{playerStats.highestTrophies}
								</p>
							</div>
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<h3 className="text-sm text-gray-400 mb-1">Level</h3>
								<p className="text-xl font-bold">{playerStats.expLevel}</p>
							</div>
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<h3 className="text-sm text-gray-400 mb-1">3v3 Victories</h3>
								<p className="text-xl font-bold">
									{playerStats["3vs3Victories"]}
								</p>
							</div>
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<h3 className="text-sm text-gray-400 mb-1">Solo Victories</h3>
								<p className="text-xl font-bold">{playerStats.soloVictories}</p>
							</div>
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<h3 className="text-sm text-gray-400 mb-1">Duo Victories</h3>
								<p className="text-xl font-bold">{playerStats.duoVictories}</p>
							</div>
						</div>
					</div>
				)}

				<div className="grid md:grid-cols-3 gap-6 mb-16">
					<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-purple-500 transition-colors text-center">
						<BarChart2 className="w-8 h-8 mx-auto	 text-purple-500 mb-2" />
						<h3 className="font-bold mb-2">Detailed Statistics</h3>
						<p className="text-gray-400 text-sm">
							Track your win rates, trophies, and performance across all
							brawlers
						</p>
					</div>
					<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-purple-500 transition-colors">
						<Trophy className="w-8 h-8 mx-auto text-purple-500 mb-2" />
						<h3 className="font-bold mb-2">Progress Tracking</h3>
						<p className="text-gray-400 text-sm">
							Monitor your improvement over time with detailed progress charts
							soon
						</p>
					</div>
					<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-purple-500 transition-colors">
						<Users className="w-8 h-8 mx-auto text-purple-500 mb-2" />
						<h3 className="font-bold mb-2">Club Information</h3>
						<p className="text-gray-400 text-sm">
							View your club stats and member performance at a glance soon
						</p>
					</div>
				</div>

				<div className="max-w-2xl mx-auto">
					<h2 className="text-xl font-bold mb-4 text-left">Recent Searches</h2>
					<div className="space-y-3">
						{recentSearches.map((player, index) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 flex items-center justify-between hover:border-purple-500 transition-colors"
							>
								<div className="flex items-center gap-3">
									<div>
										<h3 className="font-bold">{player.name}</h3>
										<p className="text-sm text-gray-400">
											Trophies: {player.trophies}
										</p>
									</div>
								</div>
								<ArrowRight
									type="button"
									onClick={handlePrevious(player.tag)}
									className="w-5 h-5 text-gray-400"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<footer className="border-t border-gray-800 mt-20 py-8">
				<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-2">
						<Trophy className="w-5 h-5 text-purple-500" />
						<span className="text-sm text-gray-400">
							© 2024 AboutMyBrawl - Created by{" "}
							<a className="text-emerald-300" href="https://whirlxd.xyz">
								whirlxd
							</a>
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default BrawlStarsStats;
