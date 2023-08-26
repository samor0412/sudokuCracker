
import * as fs from 'fs';

export class Sudoku {
    static EMPTY = 0;

    private hintDimension: number[][] = [
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
        [Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY, Sudoku.EMPTY],
    ]

    constructor(private dimension: number[][]) { }

    static getSudokuFromFile(path: string) {
        const data = fs.readFileSync(`${process.cwd()}/${path}`,
            { encoding: 'utf8', flag: 'r' });

        const rows = data.split('\n');
        const dimension = rows.map(row => row.split(',').map(cell => parseInt(cell.trim())))
        return new Sudoku(dimension)
    }

    isEMPTY(row: number, column: number) {
        return this.dimension[row][column] === Sudoku.EMPTY
    }

    getCellAdjacent(row: number, column: number) {
        const cell = this.dimension[row][column]
        const rowAdjacentCells = [...this.dimension[row]]
        const columnAdjacentCells = this.dimension.map(row => row[column])

        const gridAdjacentRowIndexes = Math.floor(row / 3)
        const gridAdjacentColumnsIndexes = Math.floor(column / 3)
        let gridAdjacentCells: number[] = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gridAdjacentCells.push(this.dimension[gridAdjacentRowIndexes * 3 + i][gridAdjacentColumnsIndexes * 3 + j])
            }
        }
        gridAdjacentCells = gridAdjacentCells.filter(c => c !== cell && c !== Sudoku.EMPTY)

        rowAdjacentCells.splice(column, 1);
        columnAdjacentCells.splice(row, 1)
        return { rowAdjacentCells, columnAdjacentCells, gridAdjacentCells }
    }

    isCompleted() {
        for (let i = 0; i < this.dimension.length; ++i) {
            for (let j = 0; j < this.dimension[i].length; ++j) {
                if (this.isEMPTY(i, j)) return false
            }
        }
        return true
    }

    isCorrect() {
        for (let i = 0; i < this.dimension.length; ++i) {
            for (let j = 0; j < this.dimension[i].length; ++j) {
                const { rowAdjacentCells, columnAdjacentCells } = this.getCellAdjacent(i, j)
                const cell = this.dimension[i][j]
                if (rowAdjacentCells.includes(cell) || columnAdjacentCells.includes(cell))
                    return false
            }
        }

        return true;
    }

    write(row: number, column: number, ans: number) {
        this.dimension[row][column] = ans;
    }

    read(row: number, column: number) {
        return this.dimension[row][column];
    }

    writeHint(row: number, column: number, ans: number) {
        this.hintDimension[row][column] = ans;
    }

    print() {
        const output = this.dimension.map(rows => {
            return rows.join(',')
        }).join('\n')
        return output
    }

    printVisualise() {
        const output = this.dimension.map(rows => {
            return `|${rows.join('|')}|`
        }).join('\n')
        return output
    }

    getNumOfEmpty() {
        let total = 0;
        for (let i = 0; i < this.dimension.length; ++i) {
            for (let j = 0; j < this.dimension[i].length; ++j) {
                if (this.isEMPTY(i, j)) ++total;
            }
        }
        return total
    }
}