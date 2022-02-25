import { SeverityPill } from "../severity-pill";

export function Pill(props) {
	const status = props.value;

	const getColor = () => {
		if (status === 'Pending') return '#D14343';
		else if (status === 'Delivered') return '#14B8A6';
		else return '#FFB020';
	};

	return (
		<>
			<SeverityPill
				color={(status === 'Delivered' && 'success')
					|| (status === 'Pending' && 'error')
					|| 'warning'}
			>
				{status}
			</SeverityPill>
			{/* <div
				className="pill"
				style={{
					display: "block",
					maxWidth: "7rem",
					border: '5px solid transparent',
					borderRadius: '1.5rem',
					textAlign: "center",
					backgroundColor: getColor(),
					color: "white"
				}}
			>
				{status}
			</div> */}
		</>
	);
}

