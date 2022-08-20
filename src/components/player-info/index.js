import React from "react";
export default function PlayerDetail({ close, index, addPlayer, players, disabledButton }) {
	const playerNameTest = players[index]?.name?.split(" ").join("-")
	return (
		//Style fixed to center
		<div
			className="card outlined mt-0"
			style={{
				position: "fixed",
				left: "50%",
				transform: "translateX(-50%)",
				padding: "20px",
				width: "500px",
				top: "30%",
			}}
			data-testid={`player-${playerNameTest}-details`}
		>
			{!!players && (
				<>
					<h1 className="card-title" style={{ textAlign: "center" }}>
						Player Detail
					</h1>
					<p>
						<strong>Name:</strong><span data-testid={`player-detail-${playerNameTest}-name`}>{players[index]?.name}</span>
					</p>
					<p>
						<strong>Type:</strong><span data-testid={`player-detail-${playerNameTest}-type`}>{players[index]?.type}</span>
					</p>
					<p>
						<strong>Batting:</strong><span data-testid={`player-detail-${playerNameTest}-batting`}>{players[index]?.battingSkill}</span>
					</p>
					<p>
						<strong>Bowling:</strong><span data-testid={`player-detail-${playerNameTest}-bowling`}>{players[index]?.bowlingSkill}</span>
					</p>
					<button
						disabled={disabledButton(index)}
						onClick={addPlayer}
						data-testid={`player-detail-${playerNameTest}-add`}>
						Select
					</button>
					<button onClick={close} className="danger" data-testid={`player-detail-${playerNameTest}-close`}>
						Close
					</button>
				</>
			)}
		</div>
	);
}
