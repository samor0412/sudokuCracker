import { Sudoku } from "./Sudoku";
import { SudokuCracker } from "./SudokuCracker";

const sudoku = Sudoku.getSudokuFromFile('./test/questions/expert/level2.txt')

console.log('Original sudoku')
console.log(sudoku.printVisualise())
console.log('\n\n')

const sudokuCracker = new SudokuCracker(sudoku)
sudokuCracker.execute()


console.log('Solved sudoku')
console.log(sudoku.printVisualise())


