import React from 'react';

const GlitchButton: React.FC = () => {
	const characters = [
		{ char: 'C', c1: 'x', c2: '$', c3: '≈' },
		{ char: 'l', c1: 'ç', c2: '&', c3: 'π' },
		// Add other characters here
	];

	return (
		<button className="glitch-button">
			{characters.map((item, index) => (
				<span
					key={index}
					style={
						{
							'--i': index,
							'--c1': `'${item.c1}'`,
							'--c2': `'${item.c2}'`,
							'--c3': `'${item.c3}'`,
						} as React.CSSProperties
					}
				>
					{item.char}
				</span>
			))}
			<span className="sr-only">Click Me</span>
		</button>
	);
};

export default GlitchButton;
