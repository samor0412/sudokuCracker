import { Sudoku } from "../Sudoku";
import { checkCellAdjacent, checkRemainingNumber } from "./strategy/byGrid";
import { loopGrid } from "./utils/loopGrid";


export class SudokuCracker {
    private originalEmpty: number;

    constructor(private sudoku: Sudoku) {
        this.sudoku = sudoku
        this.originalEmpty = this.sudoku.getNumOfEmpty()
    }

    execute() {
        let prevEmpty = this.originalEmpty
        let currEmpty = prevEmpty
        let counter = 0;
        do {
            counter++;
            loopGrid({
                loopGridCallback: ({ gridRowIndex, gridColumnIndex }) => {
                    checkRemainingNumber({ sudoku: this.sudoku, gridRowIndex, gridColumnIndex })
                },
                loopGridCellCallback: ({ rowIndex, columnIndex }) => {
                    checkCellAdjacent({ sudoku: this.sudoku, rowIndex, columnIndex })
                }
            })

            if (this.sudoku.isCompleted() && this.sudoku.isCorrect()) {
                break;
            }
            prevEmpty = currEmpty;
            currEmpty = this.sudoku.getNumOfEmpty();

        } while (prevEmpty !== currEmpty)
        this.report(counter)
    }

    report(counter: number) {
        const isResolved = this.sudoku.isCompleted() && this.sudoku.isCorrect();
        const result = isResolved ? 'Completed!' : "Can't be resolved"
        const finalEmpty = this.sudoku.getNumOfEmpty()

        console.log(`
${result}
total empty: ${this.originalEmpty}
resolved empty: ${this.originalEmpty - finalEmpty}
complete percentage: ${Math.floor((this.originalEmpty - finalEmpty) / this.originalEmpty * 100)}%
total iteration: ${counter}
        `)
    }
}