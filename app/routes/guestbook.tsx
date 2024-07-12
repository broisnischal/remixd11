import React, { useRef, useState, useEffect } from 'react';

interface Point {
	x: number;
	y: number;
}

type Path = Point[];

// const DrawableCanvas: React.FC = () => {
// 	const canvasRef = useRef<HTMLCanvasElement | null>(null);
// 	const [drawing, setDrawing] = useState(false);
// 	const [paths, setPaths] = useState<Path[]>([]);
// 	const [currentPath, setCurrentPath] = useState<Path>([]);
// 	const [undoPaths, setUndoPaths] = useState<Path[]>([]);
// 	const [redoPaths, setRedoPaths] = useState<Path[]>([]);

// 	const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
// 		const { offsetX, offsetY } = event.nativeEvent;
// 		setDrawing(true);
// 		setCurrentPath([{ x: offsetX, y: offsetY }]);
// 	};

// 	const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
// 		if (!drawing) return;

// 		const { offsetX, offsetY } = event.nativeEvent;
// 		setCurrentPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
// 	};

// 	const endDrawing = () => {
// 		setDrawing(false);
// 		if (currentPath.length > 0) {
// 			setPaths(prevPaths => [...prevPaths, currentPath]);
// 			setUndoPaths(prevUndoPaths => [...prevUndoPaths, currentPath]);
// 			setCurrentPath([]);
// 			setRedoPaths([]); // Clear redo paths when new drawing is added
// 		}
// 	};

// 	const drawSmoothPath = (ctx: CanvasRenderingContext2D, path: Path) => {
// 		if (path.length < 2) return;

// 		ctx.beginPath();
// 		ctx.moveTo(path[0].x, path[0].y);

// 		for (let i = 1; i < path.length - 2; i++) {
// 			const cpX = (path[i].x + path[i + 1].x) / 2;
// 			const cpY = (path[i].y + path[i + 1].y) / 2;
// 			ctx.quadraticCurveTo(path[i].x, path[i].y, cpX, cpY);
// 		}

// 		ctx.quadraticCurveTo(
// 			path[path.length - 2].x,
// 			path[path.length - 2].y,
// 			path[path.length - 1].x,
// 			path[path.length - 1].y,
// 		);

// 		ctx.stroke();
// 	};

// 	useEffect(() => {
// 		const canvas = canvasRef.current;
// 		if (!canvas) return;
// 		const ctx = canvas.getContext('2d');
// 		if (!ctx) return;

// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		ctx.strokeStyle = 'black'; // Set the drawing color to black
// 		ctx.lineWidth = 2; // Adjust the line width for better smoothing

// 		paths.forEach(path => {
// 			drawSmoothPath(ctx, path);
// 		});

// 		if (currentPath.length > 0) {
// 			drawSmoothPath(ctx, currentPath);
// 		}
// 	}, [paths, currentPath]);

// 	const handleUndo = () => {
// 		if (undoPaths.length === 0) return;
// 		const newUndoPaths = [...undoPaths];
// 		const lastPath = newUndoPaths.pop();
// 		setUndoPaths(newUndoPaths);
// 		if (lastPath) {
// 			setPaths(prevPaths =>
// 				prevPaths.filter((_, index) => index !== prevPaths.length - 1),
// 			);
// 			setRedoPaths(prevRedoPaths => [...prevRedoPaths, lastPath]);
// 		}
// 	};

// 	const handleRedo = () => {
// 		if (redoPaths.length === 0) return;
// 		const newRedoPaths = [...redoPaths];
// 		const redoPath = newRedoPaths.pop();
// 		setRedoPaths(newRedoPaths);
// 		if (redoPath) {
// 			setPaths(prevPaths => [...prevPaths, redoPath]);
// 			setUndoPaths(prevUndoPaths => [...prevUndoPaths, redoPath]);
// 		}
// 	};

// 	const handleSave = () => {
// 		const dataStr = JSON.stringify(paths);
// 		const blob = new Blob([dataStr], { type: 'application/json' });
// 		const url = URL.createObjectURL(blob);
// 		const a = document.createElement('a');
// 		a.href = url;
// 		a.download = 'drawing.json';
// 		document.body.appendChild(a);
// 		a.click();
// 		document.body.removeChild(a);
// 	};

// 	const handleReset = () => {
// 		setPaths([]);
// 		setUndoPaths([]);
// 		setRedoPaths([]);
// 		setCurrentPath([]);
// 	};

// 	const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = event.target.files?.[0];
// 		if (!file) return;

// 		const reader = new FileReader();
// 		reader.onload = e => {
// 			const text = e.target?.result;
// 			if (text) {
// 				try {
// 					const loadedPaths: Path[] = JSON.parse(text as string);
// 					setPaths(loadedPaths);
// 					setUndoPaths(loadedPaths);
// 					setRedoPaths([]);
// 				} catch (err) {
// 					console.error('Error parsing JSON:', err);
// 					alert(
// 						'Failed to load the drawing. Make sure the file format is correct.',
// 					);
// 				}
// 			}
// 		};

// 		reader.readAsText(file);
// 	};

// 	return (
// 		<div>
// 			<canvas
// 				ref={canvasRef}
// 				width={600}
// 				height={400}
// 				style={{ border: '1px solid black', cursor: 'crosshair' }}
// 				onMouseDown={startDrawing}
// 				onMouseMove={draw}
// 				onMouseUp={endDrawing}
// 				onMouseLeave={endDrawing}
// 			/>
// 			<div style={{ marginTop: '10px' }}>
// 				<button onClick={handleUndo} disabled={undoPaths.length === 0}>
// 					Undo
// 				</button>
// 				<button onClick={handleRedo} disabled={redoPaths.length === 0}>
// 					Redo
// 				</button>
// 				<button onClick={handleSave}>Save</button>
// 				<button onClick={handleReset}>Reset</button>
// 				<input type="file" accept=".json" onChange={handleLoad} />
// 			</div>
// 		</div>
// 	);
// };

// export default DrawableCanvas;

export default function Page() {
	return (
		<div>
			<h1>Sign In</h1>
		</div>
	);
}
