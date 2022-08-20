import React, { useCallback, useEffect, useState } from "react";

import PlayerDetail from "../player-info";
import playersList from "../../players.json";

const BATSMAN = "Batsman"
const ALLROUNDER = "AllRounder"
const BOWLER = "Bowler"

export default function TeamSelection() {
	const [players] = useState([...playersList]);
	const [selectedPlayers, setSelectedPlayers] = useState([]);
	const [showPlayerDetail, setShowPlayerDetail] = useState(false);
	const [idx, setIdx] = useState(null);
	const [welcome, setWelcome] = useState(true);
	
	const addPlayer = useCallback((index) => {
		const playerToAdd = players[index]

		let counterBatsman = 0
		let counterAllrounders = 0
		let counterBowlers = 0
		let counter = selectedPlayers.length

		selectedPlayers.forEach((element) => {
			element.type === BATSMAN && counterBatsman++
			element.type === ALLROUNDER && counterAllrounders++
			element.type === BOWLER && counterBowlers++
		})

		if (counter > 10) {
			alert('Only 11 players are allowed in a team');
			return;
		}

		if (counterBatsman > 5 && playerToAdd.type === BATSMAN) {
			alert('Batsmen can not be more than 6');
			return;
		}

		if (counterAllrounders > 3 && playerToAdd.type === ALLROUNDER) {
			alert('All Rounders can not be more than 4');
			return;
		}

		if (counterBowlers > 5 && playerToAdd.type === BOWLER) {
			alert('Bowlers can not be more than 6');
			return;
		}
		setSelectedPlayers([...selectedPlayers, playerToAdd])
		setShowPlayerDetail(false)
	}, [selectedPlayers, showPlayerDetail, players]);

	const removePlayer = (index) => {
		const playerByIndex = selectedPlayers[index]
		setSelectedPlayers(selectedPlayers.filter(player => player.name !== playerByIndex.name))
	};

	const showplayerDetailsCard = (index) => {
		setIdx(index)
		setShowPlayerDetail(true)
		return;
	};

	const closeCard = () => {
		setShowPlayerDetail(false)
	};

	const closeWelcome = () => {
		setWelcome(false)
	}

	const disabledButton = (index) => {
		const playerIndexListed = players[index]
		const playerSelected = selectedPlayers.find(player => player.name === playerIndexListed.name)
		if (playerSelected) {
			return true
		}
		return false
	}

	const ModalDetails = () => {
		if (showPlayerDetail) {
			return (
				<PlayerDetail
					players={players}
					close={closeCard}
					index={idx}
					addPlayer={() => addPlayer(idx)}
					disabledButton={() => disabledButton(idx)}
				/>
			)
		}

		return <></>
	}

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center">
			<div style={{ display: "flex", width: "80%" }}>

				<ModalDetails />
				<div
					className="card outlined mt-0"
					style={{
						width: "50%",
						marginRight: "10px",
						overflow: "scroll",
						height: "80vh",
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: "center" }}>Available Players</h4>
						<table>
							<thead>
								<tr>
									<th
										data-testid="available-players-name"
									>
										Name
									</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="available-players-table-body">
								{welcome && (
									<tr>
										<td data-testid="selection-rules" colSpan="3" className="card pb-20">
											<p data-testid="close-welcome" style={{ textAlign: 'right' }} onClick={closeWelcome}>X</p>
											<h3 style={{ textAlign: "center" }}>
												<strong>Welcome to Team Selection</strong>
											</h3>
											11 players are required in a team <br />
											3-6 batsmen and bowlers are allowed in a team
											<br />
											Only 1 Wicket Keeper required in a team
											<br />
											1-4 All Rounders are allowed in a team
										</td>
									</tr>
								)}

								{players.map((player, index) => {
									return (
										<tr
											data-testid={`available-${player.name
												.split(" ")
												.join("-")}-row`}
											key={index}
										>
											<td
												data-testid={`available-${player.name
													.split(" ")
													.join("-")}-name`}
												onClick={() => showplayerDetailsCard(index)}
											>
												{player.name}
											</td>
											<td onClick={() => showplayerDetailsCard(index)}>
												{player.type}
											</td>
											<td>
												<button
													data-testid={`available-${player.name
														.split(" ")
														.join("-")}-select`}
													onClick={() => addPlayer(index)}
													disabled={disabledButton(index)}
													className="btn btn-primary text"
												>
													Select
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div
					className="card outlined mt-0"
					style={{
						width: "50%",
						marginRight: "10px",
						overflow: "scroll",
						height: "80vh",
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: "center" }}>Selected Players</h4>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="selected-players-table-body">
								{selectedPlayers && selectedPlayers.map((player, index) => {
									return (
										<tr
											data-testid={`selected-${player.name
												.split(" ")
												.join("-")}-row`}
											key={index}
										>
											<td>{player.name}</td>
											<td>{player.type}</td>
											<td>
												<button
													data-testid={`selected-${player.name
														.split(" ")
														.join("-")}-remove`}
													onClick={() => removePlayer(index)}
													className="btn danger text"
												>
													Remove
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
