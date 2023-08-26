import { Sudoku } from "./Sudoku";

const NUMBER_SET = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
export class SudokuCracker {
    private originalEmpty: number;

    constructor(private sudoku: Sudoku) {
        this.sudoku = sudoku
        this.originalEmpty = this.sudoku.getNumOfEmpty()
    }

    execute() {
        let counter = 0
        let originalEmpty = this.sudoku.getNumOfEmpty()
        while (counter < 1000) {
            // computation
            this.checkGrid();

            if (this.sudoku.isCompleted() && this.sudoku.isCorrect()) {
                break;
            }
            counter++;
        }
        this.report()
    }

    report() {
        const isResolved = this.sudoku.isCompleted() && this.sudoku.isCorrect();
        const result = isResolved ? 'Completed!' : "Can't be resolved"
        const finalEmpty = this.sudoku.getNumOfEmpty()

        console.log(`
${result}
total empty: ${this.originalEmpty}
resolved empty: ${this.originalEmpty - finalEmpty}
complete percentage: ${Math.floor((this.originalEmpty - finalEmpty) / this.originalEmpty * 100)}%
        `)
    }

    private checkGrid() {
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                for (let gridI = 0; gridI < 3; ++gridI) {
                    for (let gridJ = 0; gridJ < 3; ++gridJ) {
                        const rowIndex = i * 3 + gridI;
                        const columnIndex = j * 3 + gridJ;
                        const cell = this.sudoku.read(rowIndex, columnIndex)

                        const { rowAdjacentCells, columnAdjacentCells, gridAdjacentCells } = this.sudoku.getCellAdjacent(rowIndex, columnIndex)
                        const numberSet = new Set(NUMBER_SET);
                        rowAdjacentCells.forEach(cell => numberSet.delete(cell))
                        columnAdjacentCells.forEach(cell => numberSet.delete(cell))
                        gridAdjacentCells.forEach(cell => numberSet.delete(cell))

                        if (numberSet.size === 1) {
                            const [target] = numberSet
                            this.sudoku.write(rowIndex, columnIndex, target)
                        }
                    }
                }
            }
        }
    }
}