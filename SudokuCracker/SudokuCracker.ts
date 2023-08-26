import { Sudoku } from "../Sudoku";
import { checkCellAdjacent } from "./strategy/byGrid/checkCallAdjacent";
import { loopGrid } from "./utils/loopGrid";


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
            loopGrid(({ rowIndex, columnIndex }) => {
                checkCellAdjacent({ sudoku: this.sudoku, rowIndex, columnIndex })
            })

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
}