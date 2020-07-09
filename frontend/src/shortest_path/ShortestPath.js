import React from 'react';
import './ShortestPath.scss';
import Point from './point.js';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

const canvasId = 'canvas';
const gridMultiplier = 25;

class ShortestPath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 30,
            cols: 30
        };
        this.points = [];

        this.handleGridChange = this.handleGridChange.bind(this);
        this.handleGridClick = this.handleGridClick.bind(this);
        this.handleFindPathClick = this.handleFindPathClick.bind(this);
    }

    componentDidMount() {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.drawGrid(this.state.rows, this.state.cols);

        this.props.cableApp.cable.subscriptions.create('PathsChannel', {
            received: this.listenToPathUpdates.bind(this)
        });
    }

    componentDidUpdate() {
        this.drawGrid(this.state.rows, this.state.cols);
    }

    listenToPathUpdates(data) {
        let color = data.done ? "green" : "black";

        for (let point of data.points) {
            point = Object.assign(new Point(), point);
            if (point.equals(this.points[0]) || point.equals(this.points[1])) continue;

            this.drawPoint(point, color);
        }
    }

    handleGridChange(event) {
        let input = event.target.value.toLowerCase();
        const grid = input.split('x');
        if (isNaN(grid[0]) || isNaN(grid[1])) {
            console.error(`not a number: ${grid}`);
            return;
        }

        this.setState({ rows: +grid[0], cols: +grid[1] });
    }

    handleGridClick(event) {
        if (this.points.length >= 2) return;

        const bounding = this.canvas.getBoundingClientRect();
        const pixelCol = event.clientX - bounding.x;
        const pixelRow = event.clientY - bounding.y;

        let point = new Point(Math.floor(pixelRow / gridMultiplier),
            Math.floor(pixelCol / gridMultiplier));
        this.points.push(point);
        this.drawPoint(point, 'red');
    }

    drawPoint(point, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.fillRect(point.y * gridMultiplier, point.x * gridMultiplier,
            gridMultiplier, gridMultiplier);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawGrid(row, col) {
        this.ctx.strokeStyle = 'white';

        // clear previous
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw rows
        this.ctx.beginPath();
        for (let i = 1; i < row; i++) {
            let currentRow = i * gridMultiplier;
            this.ctx.moveTo(0, currentRow);
            this.ctx.lineTo(col * gridMultiplier, currentRow);
            this.ctx.stroke();
        }
        this.ctx.closePath();

        // draw columns
        this.ctx.beginPath();
        for (let i = 1; i < col; i++) {
            let currentCol = i * gridMultiplier;
            this.ctx.moveTo(currentCol, 0);
            this.ctx.lineTo(currentCol, row * gridMultiplier);
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }

    handleFindPathClick() {
        let body = JSON.stringify({
            grid_attributes: {
                rows: this.state.rows,
                cols: this.state.cols
            },
            points_attributes: this.points
        });

        fetch('/api/path_finder/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).catch(err => console.error(err));
    }

    render() {
        return (
            <div className="container">
                <div className="interaction">
                    <TextField id="standard-basic" label="Row x Column"
                        value={`${this.state.rows}x${this.state.cols}`}
                        onChange={this.handleGridChange} />

                    <Button variant="outlined" color="primary"
                        onClick={this.handleFindPathClick}>
                        Find shortest path
                    </Button>
                </div>

                <div className="canvas-container">
                    <canvas
                        id={canvasId}
                        width={this.state.cols * gridMultiplier}
                        height={this.state.rows * gridMultiplier}
                        onClick={this.handleGridClick}>
                    </canvas>
                </div>
            </div>
        )
    }
}

export default ShortestPath;